import { AppsService } from './apps.service';
import { CreateAppDto, ReportProgressComment, ReportProgressDto, StatusReportApp } from './dto/create-app.dto';
import { ScalarReportApp } from 'types/Apps';
export declare class AppsController {
    private readonly appsService;
    constructor(appsService: AppsService);
    create(createAppDto: CreateAppDto): Promise<{
        success: boolean;
        data: {
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.StatusApp;
            repositoryUrl: string | null;
            deploymentUrl: string | null;
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
            createdAt: Date;
            updatedAt: Date;
            clientId: string;
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            appId: string;
            apiKeyId: string;
            images: string[];
            priority: import(".prisma/client").$Enums.PriorityStatus;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    listAppReports(appId: string): Promise<{
        success: boolean;
        data: ({
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
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            appId: string;
            apiKeyId: string;
            images: string[];
            priority: import(".prisma/client").$Enums.PriorityStatus;
        })[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    addReportProgress({ data, newStatus }: {
        data: ReportProgressDto;
        newStatus?: StatusReportApp;
    }): Promise<{
        success: boolean;
        data: {
            status: import(".prisma/client").$Enums.StatusIssue;
            id: string;
            createdAt: Date;
            description: string;
            images: string[];
            reportId: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    allProgreesInReport(reportId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            images: string[];
            reportId: string;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    addReportComment(data: ReportProgressComment): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            clientId: string;
            images: string[];
            reportId: string;
            content: string;
        };
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.StatusApp;
            repositoryUrl: string | null;
            deploymentUrl: string | null;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    autReportApp({ errorMessage }: {
        errorMessage: string;
    }): Promise<{
        success: boolean;
        data: import("../huggingface/huggingface.service").ErrorAnalysis;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.StatusApp;
            repositoryUrl: string | null;
            deploymentUrl: string | null;
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
