import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class shoppingListService {
  changeIngredients = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  getIngredient() {
    return this.ingredients.slice();
  }
  
  onAddIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.changeIngredients.emit(this.ingredients)
  }
}