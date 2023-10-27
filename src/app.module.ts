import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './Category/category.module';
import { DishModule } from './dish/dish.module';
import { IngredientModule } from './ingredient/ingredient.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    CategoryModule,
    DishModule,
    IngredientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
