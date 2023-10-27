import { Module } from '@nestjs/common';
import { DishResolver } from './dish.resolver';
import { PrismaService } from '../prisma.service';
import { DishService } from './dish.service';

@Module({
  providers: [DishResolver, PrismaService, DishService],
})
export class DishModule {}
