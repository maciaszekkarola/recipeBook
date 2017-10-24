import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Recipe } from './../../../models/recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

const url = 'https://recipe-book-c850b.firebaseio.com/';

@Injectable()

export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
        return this.http.get<Recipe[]>(`${url}recipes.json`, {
            observe: 'body', 
            responseType: 'json'
        });
    })
    .map(
        (recipes) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        }
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
        const req = new HttpRequest(
                    'PUT', 
                    `${url}recipes.json`, 
                    state.recipes, 
                    {reportProgress: true}
                );
        return this.http.request(req);
    })

    

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromRecipe.FeatureState>) {}
}
