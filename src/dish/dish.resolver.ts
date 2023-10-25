import {
  Query,
  Resolver,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Category } from 'src/Category/category.model';
import { EntityNotFoundException } from 'src/filters/entity-notfound-error';
import { GetDishArgs } from './args/get-dish.args';
import { Dish } from './dish.model';
import { DishService } from './dish.service';
import { CreateDishInput } from './input/create-dish.input';
import { UpdateDishInput } from './input/update-dish.input';

@Resolver(() => Dish)
export class DishResolver {
  constructor(private readonly service: DishService) {}

  @Query(() => [Dish])
  async dishes(): Promise<Dish[]> {
    const dishes = await this.service.dishes();
    if (!dishes) return [];
    return dishes;
  }

  @Query(() => Dish)
  async dish(@Args() getDishArgs: GetDishArgs): Promise<Dish> {
    const dish = await this.service.dish(getDishArgs.dishId);
    if (!dish) throw new EntityNotFoundException('dish', getDishArgs.dishId);
    return dish;
  }

  @Mutation(() => Dish)
  async createDish(@Args('dish') newDish: CreateDishInput): Promise<Dish> {
    const dish = await this.service.createDish(newDish);
    return dish;
  }
  @Mutation(() => Dish)
  async updateDish(
    @Args() getDishArgs: GetDishArgs,
    @Args('dish') updateDish: UpdateDishInput,
  ): Promise<Dish> {
    const updatedDish = await this.service.updateDish(
      getDishArgs.dishId,
      updateDish,
    );
    return updatedDish;
  }

  @Mutation(() => Int)
  async deleteDish(@Args() getDishArgs: GetDishArgs): Promise<number> {
    const dish = await this.service.deleteDish(getDishArgs.dishId);
    if (!dish) throw new EntityNotFoundException('dish', getDishArgs.dishId);
    return dish.dishId;
  }
  @ResolveField('category', () => Category)
  async dishCategory(@Parent() dish: Dish): Promise<Category> {
    const category = await this.service.getDishCategory(dish.catId);
    return category;
  }
}
