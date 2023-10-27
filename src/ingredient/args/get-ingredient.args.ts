/* eslint-disable prettier/prettier */
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetIngredientArgs {
  @Field()
  @IsNumber()
  ingrId: number;
}
