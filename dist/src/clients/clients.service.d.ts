import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ClientsService {
    private prisma;
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
        id: string;
        companyName: string;
        email: string;
        logoCompany: string | null;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        companyName: string;
        email: string;
        password: string;
        logoCompany: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    generateApiKey(clientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        status: import(".prisma/client").$Enums.ApiKeyStatus;
        key: string;
        appId: string | null;
    }>;
    private generateRandomApiKey;
}