import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected
    .subscribe(recipe => this.recipe = recipe)
  }

}
