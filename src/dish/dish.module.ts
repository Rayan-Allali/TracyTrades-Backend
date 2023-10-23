import { Module } from '@nestjs/common';
import { DishResolver } from './dish.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [DishResolver, PrismaService],
})
export class DishModule {}
