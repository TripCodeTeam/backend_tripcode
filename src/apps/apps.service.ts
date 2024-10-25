import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScalarReportApp } from 'types/Apps';

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppDto: CreateAppDto) {
    try {
      const newApp = await this.prisma.appDevelop.create({
        data: {
          name: createAppDto.name,
          description: createAppDto.description,
          clientId: createAppDto.clientId,
          repositoryUrl: createAppDto.repositoryUrl,
          deploymentUrl: createAppDto.deploymentUrl,
        },
      });

      if (newApp) {
        return { success: true, data: newApp };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async onlyApp(appId: string) {
    try {
      const app = await this.prisma.appDevelop.findUnique({
        where: { id: appId },
      });
      if (app) {
        return { success: true, data: app };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async appsClient(clientId: string) {
    try {
      const client_apps = await this.prisma.appDevelop.findMany({
        where: { clientId },
      });

      if (client_apps) {
        return { success: true, data: client_apps };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async all() {
    try {
      const all = await this.prisma.appDevelop.findMany({
        include: {
          client: true,
        },
      });

      if (all) {
        return { success: true, data: all };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async addReportToApp({
    description,
    images,
    appId,
    clientId,
  }: ScalarReportApp) {
    try {
      const newReport = await this.prisma.reportIssue.create({
        data: {
          description,
          images,
          appId,
          clientId,
        },
      });

      if (newReport) {
        return { success: true, data: newReport };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async listReportsForApp(appId: string) {
    try {
      const listReports = await this.prisma.reportIssue.findMany({
        where: { appId },
      });

      if (listReports) {
        return { success: true, data: listReports };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}
