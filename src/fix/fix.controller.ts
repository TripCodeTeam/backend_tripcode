import {
  Controller,
  Post,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { FixService } from './fix.service';
import { CreateFixDto } from './dto/create-fix.dto';

@Controller('fix')
export class FixController {
  constructor(private readonly fixService: FixService) {}

  @Post('/:compani')
  create(
    @Param('compani') companiId: string,
    @Body() createFixDto: CreateFixDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader ? authHeader.split(' ')[1] : null;
    return this.fixService.create(createFixDto, companiId, token);
  }
}
