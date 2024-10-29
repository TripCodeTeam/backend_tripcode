import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { ScalarReportApp } from 'types/Apps';
export declare class AppsController {
    private readonly appsService;
    constructor(appsService: AppsService);
    create(createAppDto: CreateAppDto): Promise<{
        success: boolean;
        data: {
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
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    OnlyApp(appId: string): Promise<{
        success: boolean;
        data: {
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
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    addReportInApp(data: ScalarReportApp): Promise<{
        success: boolean;
        data: {
            id: string;
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            images: string[];
            priority: import(".prisma/client").$Enums.PriorityStatus;
            appId: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    listAppReports(appId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            images: string[];
            priority: import(".prisma/client").$Enums.PriorityStatus;
            appId: string;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getAllAppsForClient(clientId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.StatusApp;
            repositoryUrl: string | null;
            deploymentUrl: string | null;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    updateApp(appId: string, updateAppDto: CreateAppDto): Promise<{
        success: boolean;
        data: {
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
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    deleteApp(appId: string): Promise<{
        success: boolean;
        data: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
}
