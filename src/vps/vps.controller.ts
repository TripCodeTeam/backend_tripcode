import { Controller, Post, Body } from '@nestjs/common';
import { VpsService } from './vps.service';
import { CreateVpDto } from './dto/create-vp.dto';

@Controller('vps')
export class VpsController {
  constructor(private readonly vpsService: VpsService) {}

  @Post()
  async create(@Body() createVpDto: CreateVpDto) {
    const vps = await this.vpsService.create(createVpDto);
    return {
      message: 'VPS created successfully',
      vps, // Devuelve la información de la VPS, incluyendo SSH y contraseña
    };
  }
}
