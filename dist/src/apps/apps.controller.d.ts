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
            apiKeyId: string;
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
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
            images: string[];
            priority: import(".prisma/client").$Enums.PriorityStatus;
            appId: string;
            apiKeyId: string;
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
            description: string;
            createdAt: Date;
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
            description: string;
            status: import(".prisma/client").$Enums.StatusIssue;
            createdAt: Date;
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
            clientId: string;
            createdAt: Date;
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
