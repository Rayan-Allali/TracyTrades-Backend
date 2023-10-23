/* eslint-disable prettier/prettier */
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetCategoryArgs {
  @Field()
  @IsNotEmpty()
  categoryId: number;
}
