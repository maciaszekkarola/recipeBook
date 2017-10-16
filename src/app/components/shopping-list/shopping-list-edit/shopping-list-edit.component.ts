import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import {  ShoppingListService } from '../shopping-list.service';
import unsubscriber from '../../../shared/unsubscriber';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm;
  private subscriptions: Subscription[] = [];
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  ingrArr = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.shoppingListService.startedEditing
        .subscribe(
          (index: number) => {
            this.editMode = true;
            this.editedItemIndex = index;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          }
        )
    );
  }

  ngOnDestroy() {
    unsubscriber(this.subscriptions);
   }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngr(this.editedItemIndex, newIngredient);
    }else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngr(this.editedItemIndex);
    this.onClear();
  }

}
