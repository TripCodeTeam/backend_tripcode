import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    testAuth(): Promise<{
        message: string;
    }>;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        access_token: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        access_token?: undefined;
    }>;
    getProfile(req: any): Promise<{
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
    logout(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        success: boolean;
        access_token: string;
    }>;
}
