import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports: [MailModule]
})
export class InvoicesModule {}
