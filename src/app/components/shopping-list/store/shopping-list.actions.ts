import { Ingredient } from './../../../models/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT'; 


// tutaj definiuję jakie rodzaje wlasciwosci(properties) bedzie miala 
// Action z reducerów, może mieć tylko type, ale może mieć
//  tez payload jeśli coś wysyła 
export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    payload: Ingredient;
}

export type ShoppingListActions = AddIngredient;