import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AppsController],
  providers: [AppsService, PrismaService],
})
export class AppsModule {}
