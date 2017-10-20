import { Ingredient } from './../../../models/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT'; 
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const START_EDIT = 'START_EDIT';

// tutaj definiuję jakie rodzaje wlasciwosci(properties) bedzie miala 
// Action z reducerów, może mieć tylko type, ale może mieć
//  tez payload jeśli coś wysyła 

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {};
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {};
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENTS;
    constructor(public payload: {ingredient: Ingredient}) {};
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENTS;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {};
}


// przy impotowaniu w komponencie powołuję się na typ
// import * as ShoppingListActions from ......
export type ShoppingListActions = 
    AddIngredient|
    AddIngredients|
    UpdateIngredient|
    DeleteIngredient|
    StartEdit;
