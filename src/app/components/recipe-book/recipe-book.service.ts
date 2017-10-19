// import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import 'rxjs/Rx';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';

// @Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Schnitzel', 
            'delicious, juicy schnitzel',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', 
            [
                new Ingredient('meat', 2),
                new Ingredient('fries', 1),
                new Ingredient('salt', 1)
        ]),
        new Recipe(
            'Burger', 
            'American Burger with beef minced meat',
            'https://upload.wikimedia.org/wikipedia/commons/7/7f/Hamburger_%282%29.jpg', 
            [
                new Ingredient('meat', 2),
                new Ingredient('bun', 1),
                new Ingredient('pickle', 1)
        ]),
        new Recipe(
            'Spaghetti', 
            'Pasta Italiana',
            'https://upload.wikimedia.org/wikipedia/commons/6/66/Naporitan_by_Ishikawa_Ken2.jpg', 
            [
                new Ingredient('pasta', 2),
                new Ingredient('meat', 1),
                new Ingredient('onion', 1)
        ]),
        new Recipe(
            'Omlet', 
            'Perfect breakfast',
            'https://upload.wikimedia.org/wikipedia/commons/b/b1/FoodOmelete.jpg', 
            [
                new Ingredient('egg', 2),
                new Ingredient('becon', 1),
                new Ingredient('onion', 1)
        ]),
        new Recipe(
            'Burger', 
            'American Burger with beef minced meat',
            'https://upload.wikimedia.org/wikipedia/commons/7/7f/Hamburger_%282%29.jpg', 
            [
                new Ingredient('meat', 2),
                new Ingredient('bun', 1),
        ]),
        new Recipe(
            'Schnitzel', 
            'delicious, juicy schnitzel',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', 
            [
                new Ingredient('meat', 2),
                new Ingredient('fries', 20),
        ]),
        new Recipe(
            'Burger', 
            'American Burger with beef minced meat',
            'https://upload.wikimedia.org/wikipedia/commons/7/7f/Hamburger_%282%29.jpg', 
            [
                new Ingredient('meat', 2),
        ]),
        new Recipe(
            'Spaghetti', 
            'Pasta Italiana',
            'https://upload.wikimedia.org/wikipedia/commons/6/66/Naporitan_by_Ishikawa_Ken2.jpg', 
            [
                new Ingredient('pasta', 2),
                new Ingredient('meat', 1),
                new Ingredient('onion', 1)
        ]),
        new Recipe(
            'Omlet', 
            'Perfect breakfast',
            'https://upload.wikimedia.org/wikipedia/commons/b/b1/FoodOmelete.jpg', 
            [
                new Ingredient('egg', 2),
                new Ingredient('becon', 1),
                new Ingredient('onion', 1)
        ]),
        new Recipe(
            'Burger', 
            'American Burger with beef minced meat',
            'https://upload.wikimedia.org/wikipedia/commons/7/7f/Hamburger_%282%29.jpg', 
            [
                new Ingredient('meat', 2),
                new Ingredient('bun', 1),
                new Ingredient('pickle', 1)
        ])
    ];

    // constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }    

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}


