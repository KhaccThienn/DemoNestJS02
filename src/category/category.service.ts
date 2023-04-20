import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity as Category } from './category.entity/category.entity';
import { Logger } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, ILike } from 'typeorm';
import { CategoryDTO } from './category.dto/categoryDTO';
import { ProductEntity as Product } from 'src/product/product.entity/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly cateRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  private readonly logger = new Logger();

  async getAllCategory(): Promise<Category[]> {
    return await this.cateRepository.find({
      relations: ['prods'],
    });
  }

  async getCategory(_id: number): Promise<Category[]> {
    return await this.cateRepository.find({
      select: ['id', 'name', 'status'],
      relations: ['prods'],
      where: [{ id: _id }],
    });
  }

  async createCategory(category: CategoryDTO): Promise<Category> {
    try {
      return await this.cateRepository.save(category);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async updateCategory(
    id: number,
    category: CategoryDTO,
  ): Promise<UpdateResult> {
    return await this.cateRepository.update(id, category);
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    const cate = await this.getCategory(id);
    const prodOfCate = cate[0].prods;
    this.logger.log(prodOfCate);
    prodOfCate.forEach((e) => {
      this.productRepository.delete(e);
    });

    return this.cateRepository.delete(id);
  }
}
