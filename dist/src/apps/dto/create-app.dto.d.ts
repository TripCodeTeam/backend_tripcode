import { CreateClientDto } from 'src/clients/dto/create-client.dto';
export declare class CreateAppDto {
    id?: string;
    name: string;
    description?: string;
    status?: StatusApp;
    repositoryUrl?: string;
    deploymentUrl?: string;
    clientId: string;
    client?: CreateClientDto;
    reports?: ReportsApp;
    apiKeys?: ApiKeyApp[];
    createdAt?: Date;
    updatedAt?: Date;
}
export type ReportsApp = {
    id?: string;
    description: string;
    images: string[];
    status?: StatusReportApp;
    priority?: PriorityStatusReportApp;
    appId: string;
    app?: CreateAppDto;
    clientId: string;
    client?: CreateClientDto;
    createdAt: Date;
    updatedAt: Date;
};
export type ApiKeyApp = {
    id?: string;
    key: string;
    title: string;
    description?: string;
    status?: StatusApiKey;
    clientId: string;
    client?: CreateClientDto;
    appId?: string;
    app?: CreateAppDto;
    createdAt: Date;
    updatedAt: Date;
};
export type StatusApp = 'inDevelopment' | 'completed' | 'maintenance' | 'cancelled';
export type StatusApiKey = 'active' | 'revoked' | 'expired';
export type StatusReportApp = 'open' | 'inProgress' | 'resolved' | 'closed';
export type PriorityStatusReportApp = 'low' | 'medium' | 'high' | 'critical';
