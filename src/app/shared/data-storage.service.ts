import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { AuthService } from './../components/auth/auth.service';
import { Ingredient } from './../models/ingredient.model';
import { Recipe } from './../models/recipe.model';
import { RecipeService } from './../components/recipe-book/recipe-book.service';
import { ShoppingListService } from 'app/components/shopping-list/shopping-list.service';

const url = 'https://recipe-book-c850b.firebaseio.com/';

@Injectable()

export class DataStorageService {
    
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private slService: ShoppingListService,
                private authService: AuthService) {} 

    

    // poniewaz w metodzie put nie oczekuję zadnej odpowiedzi, pomijam responseType;
    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put(`${url}recipes.json`, 
        this.recipeService.getRecipes(), {
            observe: 'body',
            // tutaj pobieram token i wpisuję params, wczesniej byl od dadany do url
            // recipes.json?=auth+token
            params: new HttpParams().set('auth', token) 
        });
    }

    fetchRecipes() {
       const token = this.authService.getToken();
        
    //    przez to że dodaję po get typ danych jakiego się spodziewam
    //  nie musze nic precyzowąć wewnątrz funkcji i mogę pozbyć się 
    // Response, nei musze też przepisywać nic na json żeby otworzyć dane

        // jeśli nie chce deklarować trzeciego parametru funkcji get:,
        //  poniżej w użyciu dodany jest 3ci parametr w celu określenia typuResponse
        // return this.http.get<Recipe[]>(`${url}recipes.json?auth=${token}`)

        // jeśli korzystam w responseType 'json' to wtedy sama musze 
        // zdeklarować typ<Recipe[]> jesli ide w 'text' to pomijam ten krok,
        //  ale dane jakie dostaję sa nieczytelne
        // observe: 'body', 'response'. responseType: 'text', 'json' i wiele innych. defaultowo jest body i json
        return this.http.get<Recipe[]>(`${url}recipes.json?auth=${token}`, {
            observe: 'body', 
            responseType: 'json'
        })
            .map(
                (recipes) => {
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
        0 
    );
    }

    fetchShoppingList() {
        const token = this.authService.getToken(); 
        return this.http.get<Ingredient[]>(`${url}shoppingList.json?auth=${token}`, {
            observe: 'body',
            responseType: 'json'
        })
            .map(
                (ingredients) => {
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

