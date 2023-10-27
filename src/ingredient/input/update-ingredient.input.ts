/* eslint-disable prettier/prettier */
import { InputType, PartialType } from '@nestjs/graphql';
import { CreateIngredientInput } from './create-ingredient.input';

@InputType()
export class UpdateIngredientInput extends PartialType(CreateIngredientInput) {}
