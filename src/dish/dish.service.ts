/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Category } from 'src/Category/category.model';
import { EntityNotFoundException } from 'src/filters/entity-notfound-error';
import { PrismaService } from 'src/prisma.service';
import { Dish } from './dish.model';
import { CreateDishInput } from './input/create-dish.input';
import { UpdateDishInput } from './input/update-dish.input';

@Injectable()
export class DishService {
  constructor(private readonly prisma: PrismaService) {}

  async dishes(): Promise<Dish[]> {
    const dishes = await this.prisma.dish.findMany();
    return dishes;
  }

  async dish(dishId: number): Promise<Dish> {
    const dish = await this.prisma.dish.findUnique({
      where: {
        dishId,
      },
    });
    return dish;
  }

  async createDish(createDish: CreateDishInput): Promise<Dish> {
    const category = await this.prisma.category.findUnique({
      where: {
        catId: createDish.catId,
      },
    });
    if (!category) return null;
    const newDish = await this.prisma.dish.create({
      data: {
        name: createDish.name,
        cookingTime: createDish.cookingTime,
        category: {
          connect: {
            catId: createDish.catId,
          },
        },
      },
    });
    return newDish;
  }

  async updateDish(dishId: number, updateDish: UpdateDishInput): Promise<Dish> {
    const oldDish = await this.prisma.dish.findUnique({
      where: {
        dishId,
      },
    });
    if (!oldDish) throw new EntityNotFoundException('Dish', dishId);
    if (updateDish.catId) {
      const category = await this.prisma.category.findUnique({
        where: {
          catId: updateDish.catId,
        },
      });

      if (!category)
        throw new EntityNotFoundException('category', updateDish.catId);
    }
    const updatedDish = Object.assign(oldDish, updateDish);
    const newDish = await this.prisma.dish.update({
      where: {
        dishId: updatedDish.dishId,
      },
      data: updatedDish,
    });
    return newDish;
  }

  async deleteDish(dishId: number): Promise<Dish | null> {
    const dish = await this.prisma.dish.findUnique({
      where: {
        dishId,
      },
    });
    if (!dish) return null;
    const deletedDish = await this.prisma.dish.delete({
      where: {
        dishId,
      },
    });
    return deletedDish;
  }

  async getDishCategory(catId: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        catId,
      },
    });
    return category;
  }
}
