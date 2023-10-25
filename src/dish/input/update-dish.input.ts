/* eslint-disable prettier/prettier */
import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDishInput } from './create-dish.input';

@InputType()
export class UpdateDishInput extends PartialType(CreateDishInput) {}
