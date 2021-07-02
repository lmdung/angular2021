import { RecipeService } from './../recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeWasSelected: Recipe;
  id: number;
  constructor(
    private service: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipeWasSelected = this.service.getRecipesByID(this.id)
    })
  }
  toShoppingList() {
    this.service.getIngredients(this.recipeWasSelected.ingredients)
  }
  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }
  deleteRecipe() {
    this.service.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
