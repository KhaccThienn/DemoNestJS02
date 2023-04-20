import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Logger,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity as Product } from './product.entity/product.entity';
import { ProductDTO } from './product.dto/productDTO';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private readonly logger = new Logger();

  @Get()
  public getAll(): Promise<Product[]> {
    return this.productService.getAllProd();
  }

  @Post(':id')
  async createProd(
    @Param('id') id: number,
    @Body() prod: ProductDTO,
  ): Promise<Product> {
    return await this.productService.create(id, prod);
  }

  @Put(':id/:cateid')
  async updateProd(
    @Param('id') id: number,
    @Param('cateid') cateid: number,
    @Body() prod: ProductDTO,
  ): Promise<UpdateResult> {
    return await this.productService.update(cateid, id, prod);
  }

  @Delete(':id')
  async deleteProd(@Param('id') id: number): Promise<DeleteResult> {
    return await this.productService.delete(id);
  }
}
