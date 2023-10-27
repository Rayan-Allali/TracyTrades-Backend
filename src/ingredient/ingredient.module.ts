import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientResolver } from './ingredient.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [IngredientService, IngredientResolver, PrismaService],
})
export class IngredientModule {}
