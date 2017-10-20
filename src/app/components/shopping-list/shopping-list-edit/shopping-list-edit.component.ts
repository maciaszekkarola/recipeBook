import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AddIngredients } from './../store/shopping-list.actions';
import { Ingredient } from '../../../models/ingredient.model';
import unsubscriber from '../../../shared/unsubscriber';
import * as fromApp from '../../../store/app.reducers';
import * as ShoppingListActions from '../store/shopping-list.actions';

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

  constructor(private store: Store<fromApp.AppState>) { }

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



    // zbieram dane z formularza i tworzę z nich nowy obiekt 
        // w tym dispatchu przekazuję jako argument obiekt więc musze odnieść się do kluczy
    // które zdefinowalam w shopping-list.actions
      // ELSE = tworzę nową instancję akcji, wywołuję klasę AddIngredient
      // w klasie przekazuję nowy Ingredient który zdefiniowałam wyżej

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
      
    }else {
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

  // w przypadku opusczenia strony podczas edytowani amusze zresetowac (ustawic na null) 
// a wszystko po to by wybrany ingredient po opuszczeniu strony nie pozostal w "tle"
  // editedIngredient: null,
  // editedIngredientIndex: -1
  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    unsubscriber(this.subscriptions);
   }

}
