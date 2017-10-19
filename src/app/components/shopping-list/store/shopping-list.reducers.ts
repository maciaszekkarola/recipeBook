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
            }
        default:
            return state;     
    }
}
