import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity as Product } from './product.entity/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDTO } from './product.dto/productDTO';
import { CategoryEntity as Category } from 'src/category/category.entity/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly cateRepository: Repository<Category>,
  ) {}

  async getAllProd(): Promise<Product[]> {
    return await this.prodRepository.find({
      select: ['id', 'name', 'price', 'salePrice', 'status', 'cate'],
      relations: ['cate'],
    });
  }

  async create(id: number, prod: ProductDTO): Promise<Product> {
    const cate = await this.cateRepository.findOneBy({ id });
    if (!cate) {
      throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);
    }
    const newProd = this.prodRepository.create({
      ...prod,
      cate,
    });
    return this.prodRepository.save(newProd);
  }

  async update(
    cateID: number,
    id: number,
    prod: ProductDTO,
  ): Promise<UpdateResult> {
    const cate = await this.cateRepository.findOneBy({ id: cateID });
    if (!cate) {
      throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);
    }
    const newProd = this.prodRepository.create({
      ...prod,
      cate,
    });
    return await this.prodRepository.update(id, newProd);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.prodRepository.delete(id);
  }
}
