import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
@Injectable({
  providedIn: "root",
})
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Test 1111', 
      'Just A Test', 
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=631&q=80',
      [
        {name: 'Meat', amount: 2},
        {name: 'cheese', amount: 4}
      ]),
    new Recipe(
      'Test 2222', 
      'Just A Test', 
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=631&q=80',
      [
        {name: 'Beef', amount: 6},
        {name: 'Rice', amount: 9}
      ]),
  ] 
  getRecipes() {
    return this.recipes.slice();
  }
}