import { Injectable } from '@nestjs/common';
import { CreateAppDto, ReportProgressComment, ReportProgressDto, StatusApp, StatusReportApp } from './dto/create-app.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScalarReportApp } from 'types/Apps';
import { UpdateAppDto } from './dto/update-app.dto';
import { HuggingfaceService } from 'src/huggingface/huggingface.service';

@Injectable()
/** 
 * Service to handle operations related to applications, 
 * including creating, updating, deleting, retrieving applications 
 * and managing reports for each application.
 */
export class AppsService {

  constructor(
    private prisma: PrismaService,
    private ia: HuggingfaceService
  ) { }

  /**
   * Creates a new application.
   * @param createAppDto - Data Transfer Object containing the application details.
   * @returns The created application or an error message on failure.
   */
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

  /**
   * Retrieves a specific application by its ID.
   * @param appId - The unique identifier of the application.
   * @returns The application data or an error message on failure.
   */
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

  /**
   * Retrieves all applications associated with a specific client.
   * @param clientId - The unique identifier of the client.
   * @returns A list of applications for the client or an error message on failure.
   */
  async appsClient(clientId: string) {
    try {
      const client_apps = await this.prisma.appDevelop.findMany({
        where: { clientId },
      });

      console.log(client_apps)

      if (client_apps) {
        return { success: true, data: client_apps };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  /**
   * Retrieves all applications, including their associated clients.
   * @returns A list of all applications with client details or an error message on failure.
   */
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

  /**
   * Adds a report to a specific application.
   * @param ScalarReportApp - Object containing report details like description, images, appId, and clientId.
   * @returns The created report or an error message on failure.
   */
  async addReportToApp({
    description,
    images,
    appId,
    clientId,
    apiKeyId,
  }: ScalarReportApp) {
    try {
      const newReport = await this.prisma.reportIssue.create({
        data: {
          description,
          images,
          appId,
          clientId,
          apiKeyId
          
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

  async addProgressToReport(data: ReportProgressDto, newStatus?: StatusReportApp) {
    try {
      if (newStatus) {
        const newProgress = await this.prisma.reportProgress.create({
          data: {
            reportId: data.reportId,
            description: data.description,
            images: data.images,
          },
        });

        const changeStatusReport = await this.prisma.reportIssue.update(
          {
            where: { id: data.reportId }, data: {
              status: newStatus
            }
          }
        )

        if (changeStatusReport) return { success: true, data: { ...newProgress, status: changeStatusReport.status } }
      } else {
        const newProgress = await this.prisma.reportProgress.create({
          data: {
            reportId: data.reportId,
            description: data.description,
            images: data.images,
          },
        });

        const changeStatusReport = await this.prisma.reportIssue.update(
          {
            where: { id: data.reportId }, data: {
              status: "inProgress"
            }
          }
        )

        if (changeStatusReport) return { success: true, data: newProgress };


      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async getAllProgressInReport(reportId: string) {
    try {
      const response = await this.prisma.reportProgress.findMany({ where: { reportId } })

      if (response) {
        return { success: true, data: response }
      }

    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }

  async addCommentToReport(data: ReportProgressComment) {
    try {
      const newComment = await this.prisma.reportComment.create({
        data: {
          reportId: data.reportId,
          clientId: data.clientId,
          content: data.content,
          images: data.images,
        },
      });
      return { success: true, data: newComment };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async iaAutReportApp(errorMessage: string) {
    try {
      const response = await this.ia.analyzeError(errorMessage)
      if (response) return { success: true, data: response }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }

  /**
   * Retrieves all reports associated with a specific application.
   * @param appId - The unique identifier of the application.
   * @returns A list of reports for the application or an error message on failure.
   */
  async listReportsForApp(appId: string) {
    try {
      const listReports = await this.prisma.reportIssue.findMany({
        where: { appId },
        include: { app: true }
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

  /**
   * Updates information for a specific application.
   * @param appId - The unique identifier of the application.
   * @param updateAppDto - Data Transfer Object containing updated application details.
   * @returns The updated application or an error message on failure.
   */
  async updateAppById(appId: string, updateAppDto: UpdateAppDto) {
    try {
      const updatedApp = await this.prisma.appDevelop.update({
        where: { id: appId },
        data: {
          ...updateAppDto,
        },
      });

      if (updatedApp) {
        return { success: true, data: updatedApp };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  /**
   * Deletes a specific application by its ID.
   * @param appId - The unique identifier of the application.
   * @returns The deleted application or an error message on failure.
   */
  async deleteApp(appId: string) {
    try {
      const deletedApp = await this.prisma.appDevelop.delete({
        where: { id: appId },
      });

      if (deletedApp) {
        return { success: true, data: "application successfully deleted" };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}
