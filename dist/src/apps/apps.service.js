"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const huggingface_service_1 = require("../huggingface/huggingface.service");
let AppsService = class AppsService {
    constructor(prisma, ia) {
        this.prisma = prisma;
        this.ia = ia;
    }
    async create(createAppDto) {
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
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async onlyApp(appId) {
        try {
            const app = await this.prisma.appDevelop.findUnique({
                where: { id: appId },
            });
            if (app) {
                return { success: true, data: app };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async appsClient(clientId) {
        try {
            const client_apps = await this.prisma.appDevelop.findMany({
                where: { clientId },
            });
            console.log(client_apps);
            if (client_apps) {
                return { success: true, data: client_apps };
            }
        }
        catch (error) {
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
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async addReportToApp({ description, images, appId, clientId, apiKeyId, }) {
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
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async addProgressToReport(data, newStatus) {
        try {
            if (newStatus) {
                const newProgress = await this.prisma.reportProgress.create({
                    data: {
                        reportId: data.reportId,
                        description: data.description,
                        images: data.images,
                    },
                });
                const changeStatusReport = await this.prisma.reportIssue.update({
                    where: { id: data.reportId }, data: {
                        status: newStatus
                    }
                });
                if (changeStatusReport)
                    return { success: true, data: { ...newProgress, status: changeStatusReport.status } };
            }
            else {
                const newProgress = await this.prisma.reportProgress.create({
                    data: {
                        reportId: data.reportId,
                        description: data.description,
                        images: data.images,
                    },
                });
                const changeStatusReport = await this.prisma.reportIssue.update({
                    where: { id: data.reportId }, data: {
                        status: "inProgress"
                    }
                });
                if (changeStatusReport)
                    return { success: true, data: newProgress };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async getAllProgressInReport(reportId) {
        try {
            const response = await this.prisma.reportProgress.findMany({ where: { reportId } });
            if (response) {
                return { success: true, data: response };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async addCommentToReport(data) {
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
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async iaAutReportApp(errorMessage) {
        try {
            const response = await this.ia.analyzeError(errorMessage);
            if (response)
                return { success: true, data: response };
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async listReportsForApp(appId) {
        try {
            const listReports = await this.prisma.reportIssue.findMany({
                where: { appId },
                include: { app: true }
            });
            if (listReports) {
                return { success: true, data: listReports };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async updateAppById(appId, updateAppDto) {
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
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async deleteApp(appId) {
        try {
            const deletedApp = await this.prisma.appDevelop.delete({
                where: { id: appId },
            });
            if (deletedApp) {
                return { success: true, data: "application successfully deleted" };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
};
exports.AppsService = AppsService;
exports.AppsService = AppsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        huggingface_service_1.HuggingfaceService])
], AppsService);
//# sourceMappingURL=apps.service.js.map