import { PartialType } from '@nestjs/mapped-types';
import { CreateVpDto } from './create-vp.dto';

export class UpdateVpDto extends PartialType(CreateVpDto) {}
