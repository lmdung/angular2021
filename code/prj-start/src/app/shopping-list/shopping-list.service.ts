import { Subject } from 'rxjs';
import {  Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class shoppingListService {
  changeIngredients = new Subject<Ingredient[]>();
  ingredientIndex = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  getIngredient() {
    return this.ingredients.slice();
  }
  getIngredientByIdx (index: number) {
    return this.ingredients[index];
  }
  onAddIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.changeIngredients.next(this.ingredients)
  }

  getListIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.changeIngredients.next(this.ingredients)
  }
  editIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.changeIngredients.next(this.ingredients.slice())
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.changeIngredients.next(this.ingredients.slice())
  }
}