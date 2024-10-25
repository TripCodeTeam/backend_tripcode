import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get('/:clientId')
  onlyClient(@Param('clientId') clientId: string) {
    return this.clientsService.infoClient(clientId);
  }

  @Post()
  generateApiKey(@Body() data: { clientId: string }) {
    return this.clientsService.generateApiKey(data.clientId);
  }
}
