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
    onlyApp(appId: string): Promise<{
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
    appsClient(clientId: string): Promise<{
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
    all(): Promise<{
        success: boolean;
        data: ({
            client: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                companyName: string;
                email: string;
                password: string;
                logoCompany: string | null;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.StatusApp;
            repositoryUrl: string | null;
            deploymentUrl: string | null;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
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
    addProgressToReport(data: ReportProgressDto, newStatus?: StatusReportApp): Promise<{
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
    getAllProgressInReport(reportId: string): Promise<{
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
    addCommentToReport(data: ReportProgressComment): Promise<{
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
    updateAppById(appId: string, updateAppDto: UpdateAppDto): Promise<{
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
