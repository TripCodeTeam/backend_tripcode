import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiKeySubscriptions } from 'src/apps/dto/create-app.dto';
export declare class ClientsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createClientDto: CreateClientDto): Promise<{
        success: boolean;
        data: {
            id: string;
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
            createdAt: Date;
            updatedAt: Date;
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
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
            createdAt: Date;
            updatedAt: Date;
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
        companyName: string;
        email: string;
        password: string;
        logoCompany: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSafeUser(userId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            companyName: string;
            email: string;
            logoCompany: string | null;
            createdAt: Date;
            updatedAt: Date;
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
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
            createdAt: Date;
            updatedAt: Date;
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
            companyName: string;
            email: string;
            password: string;
            logoCompany: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    generateApiKey(clientId: string, description?: string, subscriptionType?: ApiKeySubscriptions, monthlyFee?: number, isFree?: boolean, appId?: string, fees?: number): Promise<{
        success: boolean;
        data: {
            ApiKeyPrice: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                clientId: string | null;
                subscriptionType: import(".prisma/client").$Enums.ApiKeySubscriptions;
                monthlyFee: number;
                isFree: boolean;
                fees: number;
                apiKeyId: string | null;
            }[];
            client: {
                id: string;
                companyName: string;
                email: string;
                password: string;
                logoCompany: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
            app: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                clientId: string;
                description: string | null;
                status: import(".prisma/client").$Enums.StatusApp;
                repositoryUrl: string | null;
                deploymentUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ApiKeyStatus;
            key: string;
            title: string;
            appId: string | null;
        };
    }>;
    listAllApiKeysForClient(clientId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ApiKeyStatus;
            key: string;
            title: string;
            appId: string | null;
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
            createdAt: Date;
            updatedAt: Date;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ApiKeyStatus;
            key: string;
            title: string;
            appId: string | null;
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
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    clientId: string;
                    description: string | null;
                    status: import(".prisma/client").$Enums.StatusApp;
                    repositoryUrl: string | null;
                    deploymentUrl: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                clientId: string;
                description: string | null;
                status: import(".prisma/client").$Enums.ApiKeyStatus;
                key: string;
                title: string;
                appId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string | null;
            subscriptionType: import(".prisma/client").$Enums.ApiKeySubscriptions;
            monthlyFee: number;
            isFree: boolean;
            fees: number;
            apiKeyId: string | null;
        })[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    private generateRandomApiKey;
}
