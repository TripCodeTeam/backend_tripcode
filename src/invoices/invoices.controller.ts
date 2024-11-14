import { Controller, Get, Post, Body, Param, Query, Logger } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {

  private readonly logger = new Logger(InvoicesController.name);

  constructor(private readonly invoicesService: InvoicesService) { }

  // Ruta para generar facturas manualmente (en caso de que quieras ejecutarlo manualmente)
  @Post('generate')
  async generateInvoices() {
    try {
      await this.invoicesService.generateInvoices();
      return { message: 'Facturas generadas exitosamente.' };
    } catch (error) {
      this.logger.error('Error al generar facturas:', error);
      return { message: 'Error al generar facturas.' };
    }
  }

  // Ruta para verificar el pago de una factura
  @Post(':invoiceId/verify-payment')
  async verifyInvoicePayment(
    @Param('invoiceId') invoiceId: string,
    @Body() proofPayment: {
      value: number;
      image: string;
      indexFee: number;
    }
  ) {
    try {
      await this.invoicesService.verifyInvoicePayment(invoiceId, proofPayment);
      return { message: 'Pago verificado y registrado correctamente.' };
    } catch (error) {
      this.logger.error('Error al verificar el pago:', error);
      return { message: 'Error al verificar el pago.', error };
    }
  }

  // Ruta para obtener la factura del mes actual
  @Get('current/:apiKeyId')
  async getCurrentMonthInvoice(@Param('apiKeyId') apiKeyId: string) {
    try {
      const invoice = await this.invoicesService.getCurrentMonthInvoice(apiKeyId);
      if (invoice) {
        return invoice;
      } else {
        return { message: 'No hay facturas generadas para el mes actual.' };
      }
    } catch (error) {
      this.logger.error('Error al obtener la factura del mes actual:', error);
      return { message: 'Error al obtener la factura.', error };
    }
  }

  // // Ruta para verificar si el cliente está al día con sus pagos
  // @Get('status/:apiKeyPriceId')
  // async checkPaymentStatus(@Param('apiKeyPriceId') apiKeyPriceId: string) {
  //   try {
  //     const status = await this.invoicesService.CurrentMonthIsPay(apiKeyPriceId);
  //     return { message: status };
  //   } catch (error) {
  //     this.logger.error('Error al verificar el estado de pago:', error);
  //     return { message: 'Error al verificar el estado de pago.', error };
  //   }
  // }

  // Endpoint para verificar el estado de pago para un `apiKey`
  @Get('single-fee-status/:apiKeyId')
  async checkSingleFeePaymentStatus(@Param('apiKeyId') apiKeyId: string) {
    try {
      const status = await this.invoicesService.checkSingleFeePaymentStatus(apiKeyId);
      return status;
    } catch (error) {
      this.logger.error('Error al verificar el estado de pago:', error);
      return { message: 'Error al verificar el estado de pago.', error: error.message };
    }
  }

  // Endpoint para obtener el historial de pagos de un ApiKeyPrice
  @Get('payment-history/:apiKeyPriceId')
  async getPaymentHistory(
    @Param('apiKeyPriceId') apiKeyPriceId: string,
    @Query('year') year: number
  ) {
    try {
      // Llamamos al método del servicio para obtener el historial de pagos
      const history = await this.invoicesService.getPaymentHistory(apiKeyPriceId, year);

      // Si no se encuentran pagos, respondemos con un mensaje
      if (Array.isArray(history) && history.length === 0) {
        return { message: `No se encontraron pagos para el año ${year}.` };
      }

      // Devolvemos el historial de pagos
      return history;
    } catch (error) {
      // En caso de error, lo manejamos y lo devolvemos en la respuesta
      return { message: `Error al obtener el historial de pagos: ${error.message}` };
    }
  }
}
