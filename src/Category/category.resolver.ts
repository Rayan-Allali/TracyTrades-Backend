/* eslint-disable prettier/prettier */
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Dish } from 'src/dish/dish.model';
import { EntityNotFoundException } from 'src/filters/entity-notfound-error';
import { Category } from './category.model';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { CategoryService } from './category.service';
import { GetCategoryArgs } from './dto/args/get-category.args';

@Resolver(()=>Category)
export class CategoryResolver {
  constructor(private readonly service:CategoryService ) {}

  @Query(() => [Category])
  async Categories(): Promise<Category[]> {
    const Categories = await this.service.getCategories()
    return Categories ?? [];
  }
  @Query(()=>Category)
  async category(@Args() getCategoryArgs:GetCategoryArgs):Promise<Category | null>{
    const category = await this.service.getCategory(getCategoryArgs.categoryId)
    if (!category) {
      throw new EntityNotFoundException("category",getCategoryArgs.categoryId);
    }else{
      return category
    }
  }
  
  @Mutation(()=>Category ,{name:"addCategory"})
  async add(
    @Args('input',{type:()=>CreateCategoryInput})
    category:CreateCategoryInput
  ):Promise<Category>{
    const newCategory = await this.service.createCategory(category)
    return newCategory
  }
  @ResolveField("dishes")
  async dishes(
   @Parent()  category:Category
  ):Promise<Dish[]>{
    const categoryDishes = await this.service.getCategoryDishes(category.catId)
    if(!categoryDishes){
      return []
    }
    return categoryDishes
  }
}
