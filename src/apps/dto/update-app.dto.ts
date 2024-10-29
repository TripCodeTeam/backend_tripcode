import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateAppDto } from './create-app.dto';

export class UpdateAppDto extends PartialType(OmitType(CreateAppDto, ['client', 'clientId', 'reports', 'apiKeys'] as const)) { }
