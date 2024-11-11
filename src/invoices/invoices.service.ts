import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { Cron } from '@nestjs/schedule';
import { PaymentStatus } from '@prisma/client';
import { generateApiKey } from 'handlers/Api_key_generate';

@Injectable()
export class ApiInvoiceService {
    private readonly logger = new Logger(ApiInvoiceService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
    ) { }

    @Cron('0 0 * * *') // Ejecuta este cron diariamente a medianoche
    async checkAndGenerateInvoices() {
        this.logger.log('Checking and generating invoices for clients based on billing date...');

        // Obtener todos los clientes con servicios activos y sus detalles de facturación
        const clients = await this.prisma.clients.findMany({
            include: { apiKeys: true },
        });

        const today = new Date();
        for (const client of clients) {
            const clientBillingDate = new Date(client.createdAt).getDate(); // Fecha mensual de facturación

            if (clientBillingDate === today.getDate()) {
                for (const apiKey of client.apiKeys) {
                    const monthlyFee = 100; // Tarifa mensual o lógica para calcularla

                    // Genera la factura
                    const invoice = await this.prisma.apiInvoice.create({
                        data: {
                            clientId: client.id,
                            apiKeyId: apiKey.id,
                            invoiceNumber: `${generateApiKey()}`, // Número de factura único
                            month: today.getMonth() + 1,
                            year: today.getFullYear(),
                            totalAmount: monthlyFee,
                            paymentStatus: PaymentStatus.pending,
                        },
                    });

                    // Envía la factura por correo
                    await this.mailService.sendInvoiceEmail(client.email, invoice);
                    this.logger.log(`Invoice generated and emailed to ${client.email}`);
                }
            }
        }
    }
}
