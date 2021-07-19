import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  searchText: string;
  page: number = 1;
  viewRecipes: Recipe[];
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              ) {}

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .pipe(map(data => data.recipes))
      .subscribe(recipes => {
        this.recipes = recipes;
        this.viewRecipes = [...recipes]
      })
    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipes = recipes;
    //     }
    //   );
    // this.recipes = this.recipeService.getRecipes();
  }

  fetchRecipes() {
    this.store.dispatch(new RecipesActions.FetchRecipes())
  }
  storeRecipes(){
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  handlePageChange(event) {
    this.page = event;
  }
  searchKeyup(e) {
    const text = e.target.value.toUpperCase();
    if (!text) {
      this.viewRecipes = [...this.recipes]
    }
    if (text.trim() !== '') {
      // this.handlePageChange(1);
      this.viewRecipes = this.recipes.filter(recipe => recipe.name.toUpperCase().indexOf(text) > -1);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
