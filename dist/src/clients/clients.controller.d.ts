import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiKeySubscriptions } from 'src/apps/dto/create-app.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
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
    onlyClient(clientId: string): Promise<{
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
    updateClient(clientId: string, updateClientDto: UpdateClientDto): Promise<{
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
    deleteClient(clientId: string): Promise<{
        success: boolean;
        data: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    generateApiKey(data: {
        clientId: string;
        description?: string;
        subscriptionType: ApiKeySubscriptions;
        monthlyFee?: number;
        isFree?: boolean;
        appId: string;
    }): Promise<{
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
    getAllKeysForClient(clientId: string): Promise<{
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
    getReqInYear({ clientId, year }: {
        clientId: string;
        year: number;
    }): Promise<{
        success: boolean;
        data: any[];
    }>;
    getServicesClient(clientId: string): Promise<{
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
}
