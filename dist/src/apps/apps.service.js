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
let AppsService = class AppsService {
    constructor(prisma) {
        this.prisma = prisma;
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
    async addReportToApp({ description, images, appId, clientId, }) {
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
};
exports.AppsService = AppsService;
exports.AppsService = AppsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppsService);
//# sourceMappingURL=apps.service.js.map