import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateCartDto {
  @Type(() => Number)
  @IsNumber()
  quantity!: number;
}
