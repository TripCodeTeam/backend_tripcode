import { Module } from '@nestjs/common';
import { ApiInvoiceService } from './invoices.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module'; // Importa el módulo de correos

@Module({
  imports: [MailModule],
  providers: [ApiInvoiceService, PrismaService],
  exports: [ApiInvoiceService],
})
export class ApiInvoiceModule {}
