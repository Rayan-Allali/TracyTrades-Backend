/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ingredient {
  @Field()
  ingrId: number;
  @Field()
  name: string;
  description: string;
  @Field()
  unitM: string;
  @Field()
  type: string;
  @Field()
  imgUrl: string;
//   @Field()
//   dishIngredients:dishIngredient[]
}
