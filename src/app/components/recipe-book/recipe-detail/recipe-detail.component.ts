import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers'; 
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../recipe-book/recipe-book.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id:  number;
    authState$: Observable<fromAuth.State>;
    isAuthenticated: boolean;
    constructor (
                private store: Store<fromApp.AppState>,
                private recipeService: RecipeService,
                private route: ActivatedRoute, 
                private router: Router) {}
    
    ngOnInit() {
        this.authState$ = this.store.select('auth');
        this.authState$.subscribe(
            (dataState) => {
                this.isAuthenticated = dataState.authenticated
                console.log(this.isAuthenticated);
            }
        )
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.recipe = this.recipeService.getRecipe(this.id);
                    
                }
            );
    }

    onAddToShoppingList() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))

    }
    onEditRecipe() {
        if (this.isAuthenticated) {
            this.router.navigate(['edit'], {relativeTo: this.route})
        }else {
            this.router.navigate(['/signin'], {relativeTo: this.route});
            
        }
    }

    onDeleteRecipe() {
            this.recipeService.deleteRecipe(this.id);
            this.router.navigate(['../'], {relativeTo: this.route});
    }
}
