import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[]
  constructor(private service: shoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.service.getIngredient();
    this.service.changeIngredients
      .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients)
  }
}
