import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiKeySubscriptions } from 'src/apps/dto/create-app.dto';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClientDto: CreateClientDto): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getAllClients(): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    deleteClient(clientId: string): Promise<{
        success: boolean;
        data: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        email: string;
        password: string;
        logoCompany: string | null;
    }>;
    getSafeUser(userId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            email: string;
            logoCompany: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    infoClient(clientId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    updateClientById(id: string, updateClientDto: UpdateClientDto): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    generateApiKey(clientId: string, description?: string, subscriptionType?: ApiKeySubscriptions, monthlyFee?: number, isFree?: boolean, appId?: string): Promise<{
        success: boolean;
        data: {
            id: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ApiKeyStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            appId: string;
            key: string;
            title: string;
        };
    }>;
    listAllApiKeysForClient(clientId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ApiKeyStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            appId: string;
            key: string;
            title: string;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    apiKeysForClient(clientId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ApiKeyStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            appId: string;
            key: string;
            title: string;
        }[];
    }>;
    supportApiReqsForClient(clientId: string, month: number, year: number): Promise<number>;
    getMonthlyReportsCounts(clientId: string, year: number): Promise<{
        success: boolean;
        data: any[];
    }>;
    getServicesOfClients(clientId: string): Promise<{
        success: boolean;
        data: ({
            apiKey: {
                app: {
                    id: string;
                    name: string;
                    description: string | null;
                    status: import(".prisma/client").$Enums.StatusApp;
                    repositoryUrl: string | null;
                    deploymentUrl: string | null;
                    clientId: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                description: string | null;
                status: import(".prisma/client").$Enums.ApiKeyStatus;
                clientId: string;
                createdAt: Date;
                updatedAt: Date;
                appId: string;
                key: string;
                title: string;
            };
        } & {
            id: string;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            apiKeyId: string;
            subscriptionType: import(".prisma/client").$Enums.ApiKeySubscriptions;
            monthlyFee: number;
            isFree: boolean;
        })[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    private generateRandomApiKey;
}
