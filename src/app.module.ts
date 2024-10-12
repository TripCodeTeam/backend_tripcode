import { Module } from '@nestjs/common';
import { FixModule } from './fix/fix.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';
import { VpsModule } from './vps/vps.module';

@Module({
  imports: [FixModule, UsersModule, VpsModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class AppModule {}

