import { CategoryEntity as Category } from 'src/category/category.entity/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float', default: 0 })
  salePrice: number;

  @ManyToOne(() => Category, (cate) => cate.prods)
  cate: Category;
}
