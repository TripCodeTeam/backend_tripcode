import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiInvoice, PaymentStatus } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) { }

  @Cron('0 0 * * *') // Ejecuta este cron diariamente a medianoche
  async generateInvoices() {
    this.logger.log('Checking and generating invoices for clients based on billing date...');

    const clients = await this.prisma.clients.findMany({
      include: {
        apiKeys: {
          include: {
            ApiKeyPrice: true,
            ApiInvoice: {
              include: {
                ProofPayment: {
                  include: {
                    ProofIMagesRegister: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    for (const client of clients) {
      const clientBillingDate = new Date(client.createdAt).getDate();

      // Verificar si hoy es el día de facturación del cliente
      if (clientBillingDate === currentDay) {
        for (const apiKey of client.apiKeys) {
          if (apiKey.status === 'active' && apiKey.ApiKeyPrice) {
            const apiKeyPrice = apiKey.ApiKeyPrice[0];
            const { monthlyFee, isFree, fees } = apiKeyPrice;

            // Filtrar facturas por el año actual
            const invoices = apiKey.ApiInvoice.filter(invoice => invoice.year === currentYear);

            // Verificar cuántas cuotas ya han sido pagadas y verificadas
            const paidFees = invoices.filter(invoice =>
              invoice.ProofPayment.some(payment =>
                payment.ProofIMagesRegister.some(image => image.isVerify)
              )
            ).length;

            // Si ya se han pagado todas las cuotas, no generar más facturas
            if (paidFees >= fees) {
              this.logger.log(`Client ${client.email} has completed all fees (${fees}). No new invoice generated.`);
              continue;
            }

            // Si es un plan de pago único y ya está pagado, no generar más facturas
            if (fees === 1 && paidFees > 0) {
              this.logger.log(`Client ${client.email} has already paid the single fee. No new invoice generated.`);
              continue;
            }

            // Verificar si ya existe una factura generada para el mes actual
            const existingInvoice = invoices.find(invoice => invoice.month === currentMonth);
            if (existingInvoice) {
              this.logger.log(`Invoice for ${client.email} already exists for the current month.`);
              continue;
            }

            // Generar la nueva factura
            const newInvoice = await this.prisma.apiInvoice.create({
              data: {
                clientId: client.id,
                apiKeyId: apiKey.id,
                indexFee: paidFees + 1,
                month: currentMonth,
                year: currentYear,
                totalAmount: isFree ? 0 : monthlyFee,
                paymentStatus: 'pending'
              }
            });

            // Enviar la factura por correo electrónico al cliente
            await this.mailService.sendInvoiceEmail(client.email, newInvoice);
            this.logger.log(`Invoice generated and emailed to ${client.email} for month ${currentMonth}/${currentYear}.`);
          }
        }
      }
    }
  }

  // Método para registrar el pago y generar ProofPayment y ProofIMagesRegister
  async verifyInvoicePayment(invoiceId: string, proofPayment: {
    value: number;
    image: string;
    indexFee: number;
  }) {
    const { value, image, indexFee } = proofPayment;

    // Crear un nuevo registro de ProofPayment y ProofIMagesRegister
    await this.prisma.proofPayment.create({
      data: {
        apiInvoiceId: invoiceId,
        indexFee,
        value,
        ProofIMagesRegister: {
          create: {
            image,
            isVerify: true,
            indexFee: indexFee.toString(),
            value
          }
        }
      }
    });

    // Marcar la factura como pagada
    await this.prisma.apiInvoice.update({
      where: { id: invoiceId },
      data: {
        paymentStatus: PaymentStatus.paid,
        completeFees: { increment: 1 }
      }
    });

    this.logger.log(`Payment for invoice ${invoiceId} verified and registered.`);
  }

  // Método para obtener la factura del mes actual
  async getCurrentMonthInvoice(apiKeyId: string): Promise<ApiInvoice | null> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return this.prisma.apiInvoice.findFirst({
      where: {
        apiKeyId,
        month: currentMonth,
        year: currentYear
      }
    });
  }

  // Método para verificar si todas las facturas anteriores han sido pagadas
  async CurrentMonthIsPay(apiKeyPriceId: string) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const invoices = await this.prisma.apiInvoice.findMany({
      where: { apiKeyId: apiKeyPriceId },
      orderBy: [{ year: 'asc' }, { month: 'asc' }],
      include: { ProofPayment: { include: { ProofIMagesRegister: true } } }
    });

    const maxIndexFee = invoices[0]?.indexFee || 0;

    if (invoices.length < maxIndexFee) {
      return `Faltan facturas. Deben existir ${maxIndexFee} facturas hasta el mes actual.`;
    }

    const allPreviousInvoicesPaid = invoices.every(invoice =>
      (invoice.year < currentYear || (invoice.year === currentYear && invoice.month < currentMonth))
        ? invoice.paymentStatus === 'paid'
        : true
    );

    if (!allPreviousInvoicesPaid) {
      return 'Existen facturas anteriores que aún no han sido pagadas.';
    }

    const currentInvoice = invoices.find(invoice => invoice.year === currentYear && invoice.month === currentMonth);

    if (currentInvoice && currentInvoice.paymentStatus === 'pending') {
      return 'El pago del mes actual está pendiente.';
    }

    return 'El cliente está al día con sus pagos.';
  }

  async checkSingleFeePaymentStatus(apiKeyId: string): Promise<{
    Month: number;
    isPay: boolean;
    pending?: boolean;
    currentFee?: number;
    completedFees?: number;
  }> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Obtener información del `apiKey`, su `ApiKeyPrice`, facturas y pruebas de pago
    const apiKey = await this.prisma.apiKey.findUnique({
      where: { id: apiKeyId },
      include: {
        ApiKeyPrice: true,
        ApiInvoice: {
          orderBy: [{ year: 'asc' }, { month: 'asc' }],
          include: {
            ProofPayment: {
              include: {
                ProofIMagesRegister: true
              }
            }
          }
        }
      }
    });

    if (!apiKey || !apiKey.ApiKeyPrice.length) {
      throw new Error('ApiKey no encontrado o no tiene un plan de precios asociado.');
    }

    const apiKeyPrice = apiKey.ApiKeyPrice[0];
    const { fees, createdAt } = apiKeyPrice;

    // Caso 1: Si `fees` es igual a 1, devolver el mes de creación del `ApiKeyPrice`
    if (fees === 1) {
      const apiKeyCreationMonth = new Date(createdAt).getMonth() + 1;
      return { Month: apiKeyCreationMonth, isPay: false };
    }

    // Caso 2: Si `fees` es mayor a 1
    const invoices = apiKey.ApiInvoice;
    const completedInvoices = invoices.filter(invoice =>
      invoice.ProofPayment.some(proof =>
        proof.ProofIMagesRegister.some(image => image.isVerify)
      )
    );

    const paidFeesCount = completedInvoices.length;

    // Si se han completado todas las cuotas
    if (paidFeesCount >= fees) {
      const lastSuccessfulInvoice = completedInvoices[paidFeesCount - 1];
      return {
        Month: lastSuccessfulInvoice.month,
        isPay: true,
        completedFees: paidFeesCount
      };
    }

    // Si aún faltan cuotas por completar
    const nextFeeIndex = paidFeesCount + 1;
    return {
      Month: currentMonth,
      isPay: false,
      pending: true,
      currentFee: nextFeeIndex
    };
  }

  async getPaymentHistory(apiKeyPriceId: string, year: number) {
    try {
      // Obtener el `ApiKeyPrice` para el `apiKeyPriceId`
      const apiKeyPrice = await this.prisma.apiKeyPrice.findUnique({
        where: { id: apiKeyPriceId },
        include: {
          apiKey: {
            include: {
              ApiInvoice: {
                orderBy: [{ year: 'asc' }, { month: 'asc' }],
              },
            },
          },
        },
      });

      // Validar que se haya encontrado el `ApiKeyPrice`
      if (!apiKeyPrice || !apiKeyPrice.apiKey) {
        throw new Error('ApiKeyPrice no encontrado.');
      }

      const apiKey = apiKeyPrice.apiKey;
      const allInvoices = apiKey.ApiInvoice;

      // Convertir `year` a número para asegurarse de que la comparación funcione
      const yearAsNumber = Number(year); // Asegurarnos de que `year` sea un número
      // console.log('Tipo de year recibido:', typeof year);
      // console.log('Tipo de invoice.year:', typeof allInvoices[0].year);

      // Filtrar las facturas por el año especificado, asegurándonos de comparar números
      const invoicesForYear = allInvoices.filter(invoice => invoice.year === yearAsNumber);

      // // Mostrar el resultado de la filtración
      // console.log("Facturas para el año:", invoicesForYear);

      // Si no hay facturas para el año especificado, retornar un array vacío
      if (invoicesForYear.length === 0) {
        throw new Error(`No se encontraron facturas para el año ${yearAsNumber}.`)
      }

      // Devolver todas las facturas para ese año, estén al día o no
      return { success: true, data: invoicesForYear };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }

}
