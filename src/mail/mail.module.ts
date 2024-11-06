import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.example.com', // Cambia esto por la configuración de tu SMTP
                port: 587,
                secure: false,
                auth: {
                    user: 'user@example.com',
                    pass: 'password',
                },
            },
            defaults: {
                from: '"TripCode" <helpertripcode@gmail.com>',
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
