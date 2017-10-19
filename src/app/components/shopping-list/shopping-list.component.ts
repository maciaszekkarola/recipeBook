import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import unsubscriber from '../../shared/unsubscriber';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscriptions: Subscription[] = [];

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscriptions.push(this.shoppingListService.ingrChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // ));
  }
  ngOnDestroy() {
   unsubscriber(this.subscriptions);
  }

  onEditIngr(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
