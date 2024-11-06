import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendInvoiceEmail(to: string, invoice: any) {
        await this.mailerService.sendMail({
            to,
            subject: `Your Monthly Invoice - ${invoice.invoiceNumber}`,
            text: `Dear client, your monthly invoice has been generated.`,
            html: `<p>Dear client,</p><p>Your monthly invoice has been generated:</p>
             <ul>
               <li>Invoice Number: ${invoice.invoiceNumber}</li>
               <li>Total Amount: ${invoice.totalAmount}</li>
               <li>Due Date: ${new Date(invoice.createdAt).toLocaleDateString()}</li>
             </ul>
             <p>Please log in to your account to view and pay your invoice.</p>`,
        });
    }
}
