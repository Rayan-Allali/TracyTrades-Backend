/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
  
  @Mutation(()=>Category ,{name:"createCategory"})
  async createCategory(
    @Args('createCategoryData')
    category:CreateCategoryInput
  ):Promise<Category>{
    const newCategory = await this.service.createCategory(category)
    return newCategory
  }

  @Mutation(()=>Category ,{name:"updateCategory"})
  async updateCategory(
    @Args() getCategoryArgs:GetCategoryArgs,
    @Args('updateCategoryData')
    category:CreateCategoryInput
  ):Promise<Category>{
    const newCategory = await this.service.updateCategory(getCategoryArgs.categoryId, category)
    if(!newCategory){
      throw new EntityNotFoundException('catrgory', getCategoryArgs.categoryId)
    }
    return newCategory
  }

  @Mutation(()=>Int , {name:"deleteCategory"})
  async deleteCategory(@Args() getCategoryArgs:GetCategoryArgs):Promise<number>{
    const deletedCategory = await this.service.deleteCategory(getCategoryArgs.categoryId)
    if(!deletedCategory){
      throw new EntityNotFoundException('catrgory', getCategoryArgs.categoryId)
    }
    return deletedCategory.catId
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
