import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";

import * as RecipesActions from "./recipes.actions";
import * as fromApp from "../../store/app.reducer";
@Injectable()
export class RecipesEffects {
  // @Effect()
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http
          .get<Recipe[]>(
            "https://lmdung-angular-demo-d9cd8-default-rtdb.firebaseio.com/recipes.json"
          )
          .pipe(
            map((recipes) => {
              return recipes.map((recipe) => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
              });
            }),
            map((recipes) => {
              return new RecipesActions.SetRecipes(recipes);
            })
          );
      })
    )
  );

  // @Effect({ dispatch: false })
  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select("recipes")),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            "https://lmdung-angular-demo-d9cd8-default-rtdb.firebaseio.com/recipes.json",
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
