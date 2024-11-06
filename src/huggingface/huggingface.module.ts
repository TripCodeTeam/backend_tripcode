// src/huggingface/huggingface.module.ts

import { Module } from '@nestjs/common';
import { HuggingfaceService } from './huggingface.service';

@Module({
  providers: [HuggingfaceService],
  exports: [HuggingfaceService]
})
export class HuggingfaceModule {}
