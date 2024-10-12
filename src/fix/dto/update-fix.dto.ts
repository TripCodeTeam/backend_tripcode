import { PartialType } from '@nestjs/mapped-types';
import { CreateFixDto } from './create-fix.dto';

export class UpdateFixDto extends PartialType(CreateFixDto) {}
