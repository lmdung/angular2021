import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) spForm: NgForm;
  private subscription: Subscription;
  isEdit: boolean = false;
  ingredient: Ingredient;
  ingIndex: number;
  constructor( private service: shoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.service.ingredientIndex.subscribe((index: number) =>{
      this.isEdit = true;
      this.ingIndex = index;
      this.ingredient =  this.service.getIngredientByIdx(this.ingIndex);
      this.spForm.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      })
    })
  }
  onSubmit(f: NgForm) {
    const value = f.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.isEdit) {
      this.service.editIngredient(this.ingIndex, ingredient)
    } else {
      this.service.onAddIngredient(ingredient);
    }
    this.isEdit = false;
    f.reset();
  }
  onClear() {
    this.spForm.reset();
    this.isEdit = false;
  }
  onDelete() {
    this.service.deleteIngredient(this.ingIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
