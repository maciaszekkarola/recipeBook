import { AuthService } from './../components/auth/auth.service';
import { Ingredient } from './../models/ingredient.model';
import { Recipe } from './../models/recipe.model';
import { RecipeService } from './../components/recipe-book/recipe-book.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { ShoppingListService } from 'app/components/shopping-list/shopping-list.service';

const url = 'https://recipe-book-c850b.firebaseio.com/';

@Injectable()

export class DataStorageService {
    
    constructor(private http: Http,
                private recipeService: RecipeService,
                private slService: ShoppingListService,
                private authService: AuthService) {} 

    

    storeRecipes() {
        const token = this.authService.getToken()
        return this.http.put(`${url}recipes.json?auth=${token}`, 
        this.recipeService.getRecipes() );
    }

    fetchRecipes() {
       const token = this.authService.getToken();
        
        return this.http.get(`${url}recipes.json?auth=${token}`)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }

    storeShopingList() {
        const token = this.authService.getToken()
        return this.http.put(`${url}shoppingList.json?auth=${token}`, 
        this.slService.getIngredients() );
    }

    fetchShoppingList() {
        const token = this.authService.getToken(); 
        return this.http.get(`${url}shoppingList.json?auth=${token}`)
            .map(
                (response: Response) => {
                    const ingredients: Ingredient[] = response.json();
                    return ingredients;
                }
            )
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.slService.setIngredients(ingredients);
                }
            );
    }

}
