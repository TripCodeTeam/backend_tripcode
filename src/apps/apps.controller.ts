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
import { CreateAppDto, ReportsApp } from './dto/create-app.dto';
import { ScalarReportApp } from 'types/Apps';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

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
}
