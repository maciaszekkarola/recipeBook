import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AppState } from './../store/shopping-list.reducers';
import { AddIngredients } from './../store/shopping-list.actions';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingListReducer from '../store/shopping-list.reducers';
import { Ingredient } from '../../../models/ingredient.model';
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
  editedItem: Ingredient;
  ingrArr = [];

  constructor(private store: Store<fromShoppingListReducer.AppState>) { }

  ngOnInit() {
    this.subscriptions.push(this.store.select('shoppingList')
    .subscribe(
      data => {
        // jeali index > -1 oznacza to samo co jesli index zostal wybrany 
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    ));

  }

  ngOnDestroy() {
    unsubscriber(this.subscriptions);
   }

  onSubmit(form: NgForm) {
    // zbieram dane z formularza i tworzę z nich nowy obiekt 
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // w tym dispatchu przekazuję jako argument obiekt więc musze odnieść się do kluczy
    // które zdefinowalam w shopping-list.actions
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    }else {
      // tworzę nową instancję akcji, wywołuję klasę AddIngredient
      // w klasie przekazuję nowy Ingredient który zdefiniowałam wyżej
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
