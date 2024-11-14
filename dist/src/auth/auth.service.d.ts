import { ClientsService } from 'src/clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { SafeScalarClient } from 'types/client';
export declare class AuthService {
    private clientService;
    private jwtService;
    constructor(clientService: ClientsService, jwtService: JwtService);
    generateToken(user: SafeScalarClient): Promise<string>;
    validateUser(email: string, password: string): Promise<SafeScalarClient>;
    login(user: any): Promise<{
        success: boolean;
        access_token: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        access_token?: undefined;
    }>;
    getProfile(userId: string): Promise<{
        success: boolean;
        data: {
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
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    logout(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        success: boolean;
        access_token: string;
    }>;
}
