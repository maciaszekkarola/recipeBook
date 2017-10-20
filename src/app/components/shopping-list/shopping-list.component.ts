import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState$: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState$ = this.store.select('shoppingList');
  }

  onEditIngr(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

}
