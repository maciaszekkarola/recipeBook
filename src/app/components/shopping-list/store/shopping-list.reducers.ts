import { Ingredient } from './../../../models/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from 'app/components/shopping-list/store/shopping-list.actions';


const initialState = {
    ingredients: [
        new Ingredient('Apples', 6),
        new Ingredient('Banana', 2),
        new Ingredient('Bread', 1)
    ]
}
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        
        case ShoppingListActions.ADD_INGREDIENT:
            return  {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };  

        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredients
            };  

        case ShoppingListActions.DELETE_INGREDIENTS:
        // znowu pobieram stan ingredients, wycinam z nich element i zwracam tablicę
            const Ingredients = [...state.ingredients];
            Ingredients.slice(action.payload, 1);
        
            return {
                ...state,
                ingredients: Ingredients
            };  
        default:
            return state;     
    }
}

//   w case ADD_INGREDIENTS action.payload tez musi być rozbita na
//  pojedyncze akcje (elementy w tablicy Ingredients[]) 
// tak żeby dotrzeć do każdego elementu indywidualnie
