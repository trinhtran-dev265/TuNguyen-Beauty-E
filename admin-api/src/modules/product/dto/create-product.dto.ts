import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  description!: string;
  @IsString()
  category!: string;
  @IsString()
  skinType!: string;
  @Type(() => Number)
  @IsNumber()
  price!: number;
  @Type(() => Number)
  @IsNumber()
  stock!: number;
  @IsOptional()
  @IsString()
  image?: string;
}
