import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipes.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor (
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  saveRecipes() {
    const recipesData =  this.recipesService.getRecipes();
    this.http.put('https://minrun-angular-demo-default-rtdb.firebaseio.com/recipes.json', recipesData)
      .subscribe(res => console.log(res))
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>('https://minrun-angular-demo-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
      }),
        tap(recipes => this.recipesService.fetchRecipes(recipes))
      )
  }
}