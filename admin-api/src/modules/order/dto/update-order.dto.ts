import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  status?: string;
}
