import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
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
    onlyClient(clientId: string): Promise<{
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
    generateApiKey(data: {
        clientId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        status: import(".prisma/client").$Enums.ApiKeyStatus;
        key: string;
        appId: string | null;
    }>;
}