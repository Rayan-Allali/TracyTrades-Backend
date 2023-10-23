import { Injectable } from '@nestjs/common';
import { Dish } from 'src/dish/dish.model';
import { PrismaService } from 'src/prisma.service';
import { Category } from './category.model';
import { CreateCategoryInput } from './dto/input/create-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async getCategory(catId: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        catId: catId,
      },
    });
    return category;
  }

  async createCategory(
    CreateCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const newcategory = await this.prisma.category.create({
      data: {
        name: CreateCategoryInput.name,
      },
    });
    return newcategory;
  }

  async updateCategory(
    catId: number,
    CreateCategoryInput: CreateCategoryInput,
  ): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        catId: catId,
      },
    });
    if (!category) {
      return null;
    }
    const newCategory = await this.prisma.category.update({
      where: {
        catId: catId,
      },
      data: {
        name: CreateCategoryInput.name,
      },
    });
    return newCategory;
  }

  async getCategoryDishes(catId: number): Promise<Dish[]> {
    const categoryDishes = await this.prisma.dish.findMany({
      where: {
        catId: catId,
      },
    });
    if (!categoryDishes) return [];
    return categoryDishes;
  }

  async deleteCategory(catId: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        catId: catId,
      },
    });
    if (!category) return null;
    const deletedCategory = await this.prisma.category.delete({
      where: {
        catId,
      },
    });
    return deletedCategory;
  }
}
