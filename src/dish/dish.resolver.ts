import { Query, Resolver, Args, Int, Mutation } from '@nestjs/graphql';
import { EntityNotFoundException } from 'src/filters/entity-notfound-error';
import { PrismaService } from '../prisma.service';
import { Dish } from './dish.model';
import { DishAddInput } from './input/dish-add.input';

@Resolver()
export class DishResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Dish])
  async dishes(): Promise<Dish[]> {
    const dishes = await this.prisma.dish.findMany();
    return dishes;
  }

  @Query(() => Dish)
  async dish(@Args('dishId', { type: () => Int }) id: number): Promise<Dish> {
    const dish = await this.prisma.dish.findUniqueOrThrow({
      where: {
        dishId: id,
      },
    });
    if (!dish) {
      throw new EntityNotFoundException('dish', id);
    }
    return dish;
  }

  @Mutation(() => Dish, { name: 'addDish' })
  async add(
    @Args('input', { type: () => DishAddInput })
    dish: DishAddInput,
  ): Promise<Dish> {
    const category = await this.prisma.category.findUnique({
      where: {
        catId: dish.catId,
      },
    });
    if (!category) {
      throw new EntityNotFoundException('category', dish.catId);
    }
    const newDish = await this.prisma.dish.create({
      data: {
        name: dish.name,
        cookingTime: dish.cookingTime,
        catId: dish.catId,
      },
    });
    return newDish;
  }
}
