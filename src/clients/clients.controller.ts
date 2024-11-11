// ClientsController.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiKeySubscriptions } from 'src/apps/dto/create-app.dto';

/**
 * Controller for managing client operations.
 */
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  /**
   * Endpoint to create a new client.
   * @param createClientDto - Data transfer object containing the client's information.
   * @returns Success message with the newly created client's data.
   */
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  /**
   * Endpoint to retrieve all clients.
   * @returns A list of all registered clients.
   */
  @Get()
  getAllClients() {
    return this.clientsService.getAllClients();
  }

  /**
   * Endpoint to get a specific client by their ID.
   * @param clientId - Unique identifier of the client.
   * @returns Client data excluding sensitive fields.
   */
  @Get('/:clientId')
  onlyClient(@Param('clientId') clientId: string) {
    return this.clientsService.getSafeUser(clientId);
  }

  /**
   * Endpoint to update client information by their ID.
   * @param clientId - Unique identifier of the client.
   * @param updateClientDto - Data transfer object with updated client information.
   * @returns The updated client data.
   */
  @Put('/:clientId')
  updateClient(@Param('clientId') clientId: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.updateClientById(clientId, updateClientDto);
  }

  /**
   * Endpoint to delete a client by their ID.
   * @param clientId - Unique identifier of the client.
   * @returns Success message confirming the client deletion.
   */
  @Delete('/:clientId')
  deleteClient(@Param('clientId') clientId: string) {
    return this.clientsService.deleteClient(clientId);
  }

  /**
   * Endpoint to generate a new API key for a client.
   * @param data - Object containing the client's ID.
   * @returns Generated API key linked to the client.
   */
  @Post('/key')
  generateApiKey(@Body() data: {
    clientId: string,
    description?: string,
    subscriptionType: ApiKeySubscriptions,
    monthlyFee?: number,
    isFree?: boolean
    appId: string
  }) {
    return this.clientsService.generateApiKey(
      data.clientId,
      data.description,
      data.subscriptionType,
      data.monthlyFee,
      data.isFree,
      data.appId
    );
  }

  @Get('/key/:clientId')
  getAllKeysForClient(@Param('clientId') clientId: string) {
    return this.clientsService.listAllApiKeysForClient(clientId)
  }

  @Post('/key/analytics/reqs')
  getReqInYear(@Body() { clientId, year }: { clientId: string, year: number }) {
    return this.clientsService.getMonthlyReportsCounts(clientId, year)
  }

  // Services of client
  @Get('/Services/:clientId')
  getServicesClient(@Param('clientId') clientId: string) {
    return this.clientsService.getServicesOfClients(clientId)
  }
}