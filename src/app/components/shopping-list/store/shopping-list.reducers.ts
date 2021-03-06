import { Ingredient } from './../../../models/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
    animationState: string;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 6),
        new Ingredient('Banana', 2),
        new Ingredient('Bread', 1)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
    animationState: 'normal'
};

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
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENTS:
            const Ingredients = [...state.ingredients];
            Ingredients.splice(state.editedIngredientIndex, 1);

            return {
                ...state,
                ingredients: Ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };


        case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]}
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}

