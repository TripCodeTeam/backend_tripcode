import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HuggingfaceService } from 'src/huggingface/huggingface.service';

@Module({
  controllers: [AppsController],
  providers: [AppsService, PrismaService, HuggingfaceService],
})
export class AppsModule {}
