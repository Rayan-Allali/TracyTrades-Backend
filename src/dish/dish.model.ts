/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/Category/category.model';

@ObjectType()
export class Dish{
  @Field()
  dishId: number;
  @Field()
  name: string;
  @Field()
  cookingTime: number;
  @Field({ nullable: true })
  imgUrl: string;
  @Field()
  catId: number;
  @Field(() => Category,{ nullable: true })
  category?: Category;
}
