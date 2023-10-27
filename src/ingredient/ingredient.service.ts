import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from 'src/filters/entity-notfound-error';
import { PrismaService } from 'src/prisma.service';
import { Ingredient } from './ingredient.model';
import { CreateIngredientInput } from './input/create-ingredient.input';
import { UpdateIngredientInput } from './input/update-ingredient.input';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  async ingredients(): Promise<Ingredient[]> {
    const ingredients = await this.prisma.ingredient.findMany();
    return ingredients;
  }

  async ingredient(ingrId: number): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        ingrId,
      },
    });
    if (!ingredient) throw new EntityNotFoundException('ingredient', ingrId);
    return ingredient;
  }

  async deleteIngredient(ingrId: number): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        ingrId,
      },
    });
    if (!ingredient) throw new EntityNotFoundException('ingredient', ingrId);
    const deletedIngredient = await this.prisma.ingredient.delete({
      where: {
        ingrId,
      },
    });
    return deletedIngredient;
  }
  async createIngredient(
    createIngredientInput: CreateIngredientInput,
  ): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.create({
      data: createIngredientInput,
    });
    return ingredient;
  }

  async updateIngredient(
    ingrId: number,
    updateIngredientInput: UpdateIngredientInput,
  ): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        ingrId,
      },
    });
    if (!ingredient) throw new EntityNotFoundException('ingredient', ingrId);
    const updatedIngredient = await this.prisma.ingredient.update({
      where: {
        ingrId: ingredient.ingrId,
      },
      data: updateIngredientInput,
    });
    return updatedIngredient;
  }
}
