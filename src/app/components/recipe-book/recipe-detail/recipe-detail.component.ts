import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as fromShoppingListReducer from '../../shopping-list/store/shopping-list.reducers';

import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../recipe-book/recipe-book.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
    recipe: Recipe;
    id:  number;

    constructor (
                private store: Store<fromShoppingListReducer.AppState>,
                private recipeService: RecipeService,
                private authService: AuthService,
                private route: ActivatedRoute, 
                private router: Router) {}
    
    ngOnInit() {
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
        if (this.authService.isAuthenticated()) {
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
