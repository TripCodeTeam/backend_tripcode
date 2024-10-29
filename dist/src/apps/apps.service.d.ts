import { CreateAppDto } from './dto/create-app.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScalarReportApp } from 'types/Apps';
import { UpdateAppDto } from './dto/update-app.dto';
export declare class AppsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    addReportToApp({ description, images, appId, clientId, }: ScalarReportApp): Promise<{
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
    listReportsForApp(appId: string): Promise<{
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
