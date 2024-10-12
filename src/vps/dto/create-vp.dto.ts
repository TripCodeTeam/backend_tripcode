import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateVpDto {
  @IsString()
  userId: string;

  @IsString()
  instanceName: string;

  @IsString()
  machineType: string;

  @IsString()
  zone: string;

  @IsInt()
  diskSizeGb?: number; // Si es opcional
}
