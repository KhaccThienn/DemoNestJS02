import { ProductEntity as Product } from 'src/product/product.entity/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { IsEmpty } from 'class-validator';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({
    type: 'tinyint',
    name: 'status',
  })
  status: number;

  @OneToMany(() => Product, (prod) => prod.cate)
  prods: Product[];
}
