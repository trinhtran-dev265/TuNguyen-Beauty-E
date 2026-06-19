import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AddCartDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  name!: string;

  @IsString()
  image!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  quantity!: number;
}
