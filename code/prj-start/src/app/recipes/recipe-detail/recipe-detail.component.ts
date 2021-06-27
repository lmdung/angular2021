import { RecipeService } from './../recipes.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeWasSelected: Recipe;
  constructor(private service: RecipeService) { }

  ngOnInit(): void {
  }
  toShoppingList() {
    this.service.getIngredients(this.recipeWasSelected.ingredients)
  }
}
