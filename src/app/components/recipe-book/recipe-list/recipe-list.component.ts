import { State } from './../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import unsubscriber from '../../../shared/unsubscriber';

import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../../components/auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';

import { Store } from '@ngrx/store';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],

})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] ;
  subscriptions: Subscription[] = [];
  isAuthenticated = false;
  authState$: Observable<fromAuth.State>;
  recipeState$: Observable<fromRecipe.State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private storeRecipe: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.authState$ = this.store.select('auth');
    this.subscriptions.push(this.authState$.subscribe(
        (data) => {
          this.isAuthenticated = data.authenticated;
        }
      ));

    this.recipeState$ = this.storeRecipe.select('recipes');
    this.subscriptions.push(this.recipeState$.subscribe(
      (data) => {
        this.recipes = data.recipes;
      }
    ));

  }

  ngOnDestroy() {
    unsubscriber(this.subscriptions);
  }

  onNewRecipe() {
    if (this.isAuthenticated) {
      this.router.navigate(['new'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../signin'], {relativeTo: this.route});
    }
  }


}
