import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { IsString } from 'class-validator';
export class ProductDTO {
  @IsNotEmpty({ message: 'Please provide a product name' })
  @IsString({ message: 'Please enter a valid product name' })
  @MinLength(2, { message: 'At least 2 characters' })
  name: string;

  @IsNumber()
  status: number;

  @IsNotEmpty({ message: 'Please provide a price' })
  @IsNumber()
  price: number;

  @IsNumber()
  salePrice: number;
}
