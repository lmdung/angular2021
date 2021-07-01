import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private igSubscription: Subscription;
  constructor(
    private service: shoppingListService,
   ) { }

  ngOnInit(): void {
    this.ingredients = this.service.getIngredient();
    this.igSubscription =  this.service.changeIngredients
      .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients)
  }
  ngOnDestroy(): void {
    this.igSubscription.unsubscribe();
  }
  onSelectIng(index: number) {
    this.service.ingredientIndex.next(index);
  }
}
