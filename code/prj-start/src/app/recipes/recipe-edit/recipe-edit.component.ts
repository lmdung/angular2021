import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private service: RecipeService,
    private router: Router,
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
    let ingredients = new FormArray([]);
    if (this.edit) {
      this.recipe = this.service.getRecipesByID(this.id);
      recipeName = this.recipe.name;
      recipeImage = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe['ingredients']) {
         for (let ingredient of this.recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
         }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: ingredients
    })
    console.log(this.recipeForm)
  }

  controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  onAddIng() {
    console.log('hello');
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }
  onSubmit() {
    if (this.edit) {
      this.service.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.service.newRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }
  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  onRemoveIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
