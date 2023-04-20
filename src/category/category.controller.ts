import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity as Category } from './category.entity/category.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryDTO } from './category.dto/categoryDTO';

@Controller('api/
category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public findAll(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Get(':id')
  public getById(@Param('id') id: number): Promise<Category[]> {
    return this.categoryService.getCategory(id);
  }

  @Post()
  public create(@Body() category: CategoryDTO): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Put(':id')
  public update(
    @Param('id') id: number,
    @Body() category: CategoryDTO,
  ): Promise<UpdateResult> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
