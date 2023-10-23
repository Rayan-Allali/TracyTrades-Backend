/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

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
}
