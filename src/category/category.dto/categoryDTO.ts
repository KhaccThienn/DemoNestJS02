import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty({ message: 'Please provide a category name' })
  @IsString({ message: 'Please enter a valid category name' })
  @MinLength(2, { message: 'At Least 2 characters' })
  @MaxLength(100, { message: 'At max 100 characters' })
  name: string;

  @IsNumber()
  status: number;
}
