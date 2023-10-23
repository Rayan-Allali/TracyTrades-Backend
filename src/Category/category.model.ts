/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { Dish } from 'src/dish/dish.model';

@ObjectType()
export class Category {
  @Field({nullable:true})
  catId: number;

  @Field()
  name: string;
  @Field(() => [Dish], { nullable: true })
  dishes?: Dish[];
}
