import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingListReducer from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingListReducer.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditIngr(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

}
