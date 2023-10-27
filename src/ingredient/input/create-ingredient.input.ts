/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateIngredientInput {
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsString()
  description: string;
  @Field()
  @IsString()
  unitM: string;
  @Field()
  @IsString()
  type: string;
  @Field()
  @IsString()
  imgUrl: string;
}
