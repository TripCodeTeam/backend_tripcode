import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto, ReportProgressComment, ReportProgressDto, StatusReportApp } from './dto/create-app.dto';
import { ScalarReportApp } from 'types/Apps';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) { }

  @Post()
  create(@Body() createAppDto: CreateAppDto) {
    return this.appsService.create(createAppDto);
  }

  @Get('/:appId')
  OnlyApp(@Param('appId') appId: string) {
    return this.appsService.onlyApp(appId);
  }

  @Post('report')
  addReportInApp(@Body() data: ScalarReportApp) {
    return this.appsService.addReportToApp(data);
  }

  @Get('report/all/:appId')
  listAppReports(@Param('appId') appId: string) {
    return this.appsService.listReportsForApp(appId);
  }

  // Nuevo - Agregar progreso a un reporte
  @Post('report/progress')
  addReportProgress(@Body() { data, newStatus }: { data: ReportProgressDto, newStatus?: StatusReportApp }) {
    return this.appsService.addProgressToReport(data);
  }

  @Get('report/progress/:reportId')
  allProgreesInReport(@Param('reportId') reportId: string) {
    return this.appsService.getAllProgressInReport(reportId);
  }

  // Nuevo - Agregar comentario a un reporte
  @Post('report/comment')
  addReportComment(@Body() data: ReportProgressComment) {
    return this.appsService.addCommentToReport(data);
  }

  // Nuevo - Obtener todas las aplicaciones de un cliente
  @Get('client/:clientId')
  getAllAppsForClient(@Param('clientId') clientId: string) {
    return this.appsService.appsClient(clientId);
  }

  // Gestionar reporte con IA
  @Post('report/ia/generate')
  autReportApp(@Body() { errorMessage }: { errorMessage: string }) {
    return this.appsService.iaAutReportApp(errorMessage)
  }

  // Nuevo - Actualizar información de una aplicación
  @Patch('/:appId')
  updateApp(@Param('appId') appId: string, @Body() updateAppDto: CreateAppDto) {
    return this.appsService.updateAppById(appId, updateAppDto);
  }

  // Nuevo - Eliminar una aplicación
  @Delete('/:appId')
  deleteApp(@Param('appId') appId: string) {
    return this.appsService.deleteApp(appId);
  }
}
