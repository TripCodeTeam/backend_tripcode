import { Module } from '@nestjs/common';
import { VpsService } from './vps.service';
import { VpsController } from './vps.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VpsController],
  providers: [VpsService, PrismaService],
})
export class VpsModule {}
