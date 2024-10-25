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
    async findByEmail(email) {
        return await this.prisma.clients.findUnique({
            where: { email },
        });
    }
    async getSafeUser(userId) {
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
        return safeUser;
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
        const { companyName, logoCompany, contacts, apps } = updateClientDto;
        return await this.prisma.clients.update({
            where: { id },
            data: {
                ...(companyName && { companyName }),
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
                        upsert: apps.map(({ id, name, description, status, repositoryUrl, deploymentUrl, }) => ({
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
    }
    async generateApiKey(clientId) {
        const apiKey = this.generateRandomApiKey();
        return await this.prisma.apiKey.create({
            data: {
                key: apiKey,
                client: { connect: { id: clientId } },
            },
        });
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