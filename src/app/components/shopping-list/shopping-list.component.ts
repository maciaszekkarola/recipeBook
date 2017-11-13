import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('addItem', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          color: 'red',
          opacity: 0
          })
        )
      ])
    ])
  ]
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
  animationStarted(event) {
    console.log(event);
  }

}
