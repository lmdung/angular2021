import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  edit: boolean = false;
  recipe: Recipe
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private service: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.edit = params['id'] != null;
      this.initValue();
      console.log(this.recipeForm)
    })
  }
  initValue() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    if (this.edit) {
      this.recipe = this.service.getRecipesByID(this.id);
      recipeName = this.recipe.name;
      recipeImage = this.recipe.imagePath;
      recipeDescription = this.recipe.description
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImage),
      description: new FormControl(recipeDescription)
    })
  }

  onSubmit() {
    
  }
}
