import { CreateAppDto, ReportProgressComment, ReportProgressDto, StatusReportApp } from './dto/create-app.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScalarReportApp } from 'types/Apps';
import { UpdateAppDto } from './dto/update-app.dto';
import { HuggingfaceService } from 'src/huggingface/huggingface.service';
export declare class AppsService {
    private prisma;
    private ia;
    constructor(prisma: PrismaService, ia: HuggingfaceService);
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
    onlyApp(appId: string): Promise<{
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
    appsClient(clientId: string): Promise<{
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
    all(): Promise<{
        success: boolean;
        data: ({
            client: {
                id: string;
                companyName: string;
                email: string;
                password: string;
                logoCompany: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            clientId: string;
            description: string | null;
            status: import(".prisma/client").$Enums.StatusApp;
            repositoryUrl: string | null;
            deploymentUrl: string | null;
        })[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    addReportToApp({ description, images, appId, clientId, apiKeyId, }: ScalarReportApp): Promise<{
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
    addProgressToReport(data: ReportProgressDto, newStatus?: StatusReportApp): Promise<{
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
    getAllProgressInReport(reportId: string): Promise<{
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
    addCommentToReport(data: ReportProgressComment): Promise<{
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
    iaAutReportApp(errorMessage: string): Promise<{
        success: boolean;
        data: import("src/huggingface/huggingface.service").ErrorAnalysis;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    listReportsForApp(appId: string): Promise<{
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
    updateAppById(appId: string, updateAppDto: UpdateAppDto): Promise<{
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
