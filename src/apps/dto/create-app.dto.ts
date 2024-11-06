import { CreateClientDto } from 'src/clients/dto/create-client.dto';

export class CreateAppDto {
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
  apiKey?: ApiKeyApp;
  apiKeyId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReportProgressDto = {
  id?: string;
  reportId: string
  report?: ReportsApp
  status: StatusReportApp
  description: string
  images: string[]
  createdAt?: Date
}

export type ReportProgressComment = {
  id?: string
  reportId: string
  report?: ReportsApp
  clientId: string
  client?: CreateClientDto
  content: string
  images: string[]
  createdAt?: Date
}

export type ApiKeyApp = {
  id?: string;
  key: string;
  title: string;
  description?: string;
  status?: StatusApiKey;
  clientId: string;
  client?: CreateClientDto;
  appId: string;
  app?: CreateAppDto;
  ApikeyPrice?: ApiKeyPrice[];
  ReportIssue?: ReportsApp[];
  createdAt: Date;
  updatedAt: Date;
};

export type ApiKeyPrice = {
  id?: string,
  apiKey?: ApiKeyApp
  apiKeyId: string
  client?: CreateClientDto
  clientId?: string
  subscriptionType: ApiKeySubscriptions
  monthlyFee: number
  isFree: boolean
  createdAt: Date
  updatedAt: Date
}

export type StatusApp =
  | 'inDevelopment'
  | 'completed'
  | 'maintenance'
  | 'cancelled';

export type StatusApiKey = 'active' | 'revoked' | 'expired';

export type StatusReportApp = 'open' | 'inProgress' | 'resolved' | 'closed';

export type PriorityStatusReportApp = 'low' | 'medium' | 'high' | 'critical';

export type ApiKeySubscriptions = "BUG_SUPPORT" | "FEATURE_DEVELOPMENT"