import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Ingredient } from './../models/ingredient.model';
import { Recipe } from './../models/recipe.model';
import { RecipeService } from './../components/recipe-book/recipe-book.service';

const url = 'https://recipe-book-c850b.firebaseio.com/';

@Injectable()

export class DataStorageService {
    
    constructor(private http: HttpClient,
                private recipeService: RecipeService) {} 

    storeRecipes() {
        // const req = new HttpRequest(
        //         'PUT', 
        //         `${url}recipes.json`, 
        //         this.recipeService.getRecipes(), 
        //         {reportProgress: true}
        //     );
        //     return this.http.request(req);
    }


    fetchRecipes() {
        // return this.http.get<Recipe[]>(`${url}recipes.json`, {
        //     observe: 'body', 
        //     responseType: 'json'
        // })
        //     .map(
        //         (recipes) => {
        //             for (let recipe of recipes) {
        //                 if (!recipe['ingredients']) {
        //                     recipe['ingredients'] = [];
        //                 }
        //             }
        //             return recipes;
        //         }
        //     )
        //     .subscribe(
        //         (recipes: Recipe[]) => {
        //             this.recipeService.setRecipes(recipes);
        //         }
        //     );
    }

}

