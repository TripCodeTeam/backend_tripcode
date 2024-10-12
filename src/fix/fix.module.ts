import { Module } from '@nestjs/common';
import { FixService } from './fix.service';
import { FixController } from './fix.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FixController],
  providers: [FixService, PrismaService],
})
export class FixModule {}
