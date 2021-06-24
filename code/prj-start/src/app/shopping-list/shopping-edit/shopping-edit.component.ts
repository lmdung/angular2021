import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') inputNameRef: ElementRef;
  @ViewChild('inputAmount') inputAmountRef: ElementRef;
  constructor( private service: shoppingListService) { }

  ngOnInit(): void {
  }
  onAddIngredient() {
    const nameValue = this.inputNameRef.nativeElement.value;
    const amountValue = this.inputAmountRef.nativeElement.value;
    if (nameValue.trim() !== '' && amountValue) {
      this.service.onAddIngredient({name: nameValue, amount: amountValue});
    }
  }
}
