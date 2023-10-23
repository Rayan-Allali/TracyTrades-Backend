/* eslint-disable prettier/prettier */
import { Field, InputType} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class DishAddInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNumber()
  cookingTime: number;
  @Field()
  @IsNumber()
  catId: number;
}
