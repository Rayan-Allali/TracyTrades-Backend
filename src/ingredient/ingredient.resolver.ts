import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Ingredient } from './ingredient.model';
import { IngredientService } from './ingredient.service';
import { GetIngredientArgs } from './args/get-ingredient.args';
import { CreateIngredientInput } from './input/create-ingredient.input';
import { UpdateIngredientInput } from './input/update-ingredient.input';

@Resolver(() => [Ingredient])
export class IngredientResolver {
  constructor(private readonly service: IngredientService) {}

  @Query(() => [Ingredient])
  async ingredients(): Promise<Ingredient[]> {
    const ingredients = await this.service.ingredients();
    return ingredients;
  }

  @Query(() => Ingredient)
  async ingredient(
    @Args() getIngredientArgs: GetIngredientArgs,
  ): Promise<Ingredient> {
    const ingredient = await this.service.ingredient(getIngredientArgs.ingrId);
    return ingredient;
  }

  @Mutation(() => Ingredient)
  async createIngredient(
    @Args('ingredient') createIngredientInput: CreateIngredientInput,
  ): Promise<Ingredient> {
    const newIngredient = await this.service.createIngredient(
      createIngredientInput,
    );
    return newIngredient;
  }

  @Mutation(() => Ingredient)
  async updateIngredient(
    @Args() getIngredientArgs: GetIngredientArgs,
    @Args('ingredient') updateIngredientInput: UpdateIngredientInput,
  ): Promise<Ingredient> {
    const newIngredient = await this.service.updateIngredient(
      getIngredientArgs.ingrId,
      updateIngredientInput,
    );
    return newIngredient;
  }

  @Mutation(() => Int)
  async deleteIngredient(
    @Args() getIngredientArgs: GetIngredientArgs,
  ): Promise<number> {
    const ingredient = await this.service.deleteIngredient(
      getIngredientArgs.ingrId,
    );
    return ingredient.ingrId;
  }
}
