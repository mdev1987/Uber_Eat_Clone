import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Length, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  @Length(2, 10)
  name: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  isVegan?: boolean;

  @Field()
  @Column()
  @MinLength(5)
  address: string;

  @Field()
  @Column()
  @MinLength(2)
  ownersName: string;

  @Field()
  @Column()
  @MinLength(2)
  categoryName: string;
}
