import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { AppsModule } from './apps/apps.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ClientsModule,
    AppsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtAuthGuard],
})
export class AppModule {}
