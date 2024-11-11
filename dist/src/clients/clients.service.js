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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const date_fns_1 = require("date-fns");
let ClientsService = class ClientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClientDto) {
        try {
            const hashedPass = await bcrypt.hash(createClientDto.password, 10);
            const newUser = await this.prisma.clients.create({
                data: {
                    companyName: createClientDto.companyName,
                    logoCompany: createClientDto.logoCompany,
                    email: createClientDto.email,
                    password: hashedPass,
                    contacts: {
                        create: createClientDto.contacts,
                    },
                },
            });
            if (newUser) {
                return { success: true, data: newUser };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async getAllClients() {
        try {
            const clients = await this.prisma.clients.findMany();
            return { success: true, data: clients };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async deleteClient(clientId) {
        try {
            await this.prisma.clients.delete({ where: { id: clientId } });
            return { success: true, data: 'Client deleted successfully' };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async findByEmail(email) {
        return await this.prisma.clients.findUnique({
            where: { email },
        });
    }
    async getSafeUser(userId) {
        try {
            if (!userId) {
                throw new Error('userId is required!');
            }
            const user = await this.prisma.clients.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const { password, ...safeUser } = user;
            return { success: true, data: safeUser };
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async infoClient(clientId) {
        try {
            const client = await this.prisma.clients.findUnique({
                where: { id: clientId },
            });
            if (client) {
                return { success: true, data: client };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async updateClientById(id, updateClientDto) {
        try {
            const { companyName, logoCompany, contacts, apps, email } = updateClientDto;
            const updateClient = await this.prisma.clients.update({
                where: { id },
                data: {
                    ...(companyName && { companyName }),
                    ...(email && { email }),
                    ...(logoCompany && { logoCompany }),
                    ...(contacts && {
                        contacts: {
                            upsert: contacts.map(({ id, name, phone, mail }) => ({
                                where: { id: id || '' },
                                update: { name, phone, mail },
                                create: { name, phone, mail },
                            })),
                        },
                    }),
                    ...(apps && {
                        apps: {
                            upsert: apps.map(({ id, name, description, status, repositoryUrl, deploymentUrl }) => ({
                                where: { id: id || '' },
                                update: {
                                    name,
                                    description,
                                    status,
                                    repositoryUrl,
                                    deploymentUrl,
                                },
                                create: {
                                    name,
                                    description,
                                    status,
                                    repositoryUrl,
                                    deploymentUrl,
                                },
                            })),
                        },
                    }),
                },
            });
            return { success: true, data: updateClient };
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async generateApiKey(clientId, description, subscriptionType, monthlyFee, isFree, appId) {
        const apiKey = this.generateRandomApiKey();
        let titleApi = null;
        if (subscriptionType == "BUG_SUPPORT")
            titleApi = "Soporte 24/7";
        if (subscriptionType == "FEATURE_DEVELOPMENT")
            titleApi = "Desarrollo de nuevas funcionalidades";
        const key = await this.prisma.apiKey.create({
            data: {
                key: apiKey,
                title: titleApi,
                description,
                client: { connect: { id: clientId } },
                app: { connect: { id: appId } },
                ApiKeyPrice: {
                    create: {
                        subscriptionType,
                        monthlyFee: monthlyFee || 0,
                        isFree: isFree || false,
                        client: { connect: { id: clientId } }
                    }
                }
            },
        });
        return { success: true, data: key };
    }
    async listAllApiKeysForClient(clientId) {
        try {
            const client = await this.prisma.apiKey.findMany({ where: { clientId } });
            console.log("client With Keys: ", client);
            if (client)
                return { success: true, data: client };
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    async apiKeysForClient(clientId) {
        const apis = await this.prisma.apiKey.findMany({ where: { clientId } });
        if (apis)
            return { success: true, data: apis };
    }
    async supportApiReqsForClient(clientId, month, year) {
        try {
            const startDate = (0, date_fns_1.startOfMonth)(new Date(year, month - 1));
            const endDate = (0, date_fns_1.endOfMonth)(new Date(year, month - 1));
            const count = await this.prisma.reportProgress.count({
                where: {
                    report: {
                        clientId: clientId,
                    },
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });
            return count;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving report progress count: ${error.message}`);
            }
            return 0;
        }
    }
    async getMonthlyReportsCounts(clientId, year) {
        if (!clientId || !year) {
            throw new Error('Both clientId and year are required parameters.');
        }
        const currentMonth = new Date().getMonth();
        const data = [];
        for (let month = 0; month <= currentMonth; month++) {
            const startDate = (0, date_fns_1.startOfMonth)(new Date(year, month));
            const endDate = (0, date_fns_1.endOfMonth)(new Date(year, month));
            try {
                const usageCount = await this.prisma.reportIssue.count({
                    where: {
                        clientId: clientId,
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                });
                const monthName = (0, date_fns_1.format)(startDate, 'MMM');
                data.push({ month: monthName, usage: usageCount });
            }
            catch (error) {
                console.error(`Error fetching data for month ${month + 1}:`, error);
                throw new Error(`Failed to fetch report issue count for ${month + 1}`);
            }
        }
        return { success: true, data };
    }
    async getServicesOfClients(clientId) {
        try {
            const services = await this.prisma.apiKeyPrice.findMany({
                where: { clientId },
                include: {
                    apiKey: {
                        include: { app: true }
                    }
                }
            });
            if (services)
                return { success: true, data: services };
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
        }
    }
    generateRandomApiKey() {
        return Math.random().toString(36).substring(2, 15);
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map