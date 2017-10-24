import { AppRoutingModule } from 'app/app-routing.module';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Recipe } from '../../../models/recipe.model';

import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers'; 
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipeState$: Observable<fromRecipe.State>;
    authState$: Observable<fromAuth.State>;

    // recipe: Recipe[];
    id:  number;
    isAuthenticated: boolean;

    constructor (
                private store: Store<fromApp.AppState>,
                private storeRecipe: Store<fromRecipe.FeatureState>,
                private route: ActivatedRoute, 
                private router: Router) {}
    
    ngOnInit() {
        this.authState$ = this.store.select('auth');
        this.authState$.subscribe(
            (dataState) => {
                this.isAuthenticated = dataState.authenticated
            }
        )
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.recipeState$ = this.storeRecipe.select('recipes');
                    // this.recipeState$.subscribe(
                    //     (data) => {
                    //         this.recipe = data.recipes;
                    //     }
                    // )
                }
            );
    }

    onAddToShoppingList() {
        this.storeRecipe.select('recipes')
            .take(1)
            .subscribe((recipeState$: fromRecipe.State) => {
                this.store.dispatch(new ShoppingListActions.AddIngredients(
                    recipeState$.recipes[this.id].ingredients)
                );
            });

    }
    onEditRecipe() {
        if (this.isAuthenticated) {
            this.router.navigate(['edit'], {relativeTo: this.route})
        }else {
            this.router.navigate(['/signin'], {relativeTo: this.route});
        }
    }

    onDeleteRecipe() {
        this.storeRecipe.dispatch(new RecipeActions.DeleteRecipe(this.id));
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}
