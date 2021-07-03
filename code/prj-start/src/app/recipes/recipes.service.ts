import { shoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [] 
  constructor(private slService: shoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getIngredients(ingredients: Ingredient[]) {
    this.slService.getListIngredients(ingredients)
  }
  getRecipesByID (index: number) {
    return this.recipes[index];
  }
  fetchRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  newRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe (index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe (index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}