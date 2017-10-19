import { Ingredient } from './../../../models/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from 'app/components/shopping-list/store/shopping-list.actions';


// tworzę dwa nowe interfejcy AppState i State po to by za każdym razem kiedy 
// wpisuję w constructor w komponencie nie musieć pisać tej długiej nazwy, tylko 
// by odwoływać sie po typac
// private store: Store<fromShoppingListReducer.AppState>) { }

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 6),
        new Ingredient('Banana', 2),
        new Ingredient('Bread', 1)
    ],
    editedIngredient: null,
    editedIngredientIndex: null,
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
            Ingredients.splice(action.payload, 1);
        
            return {
                ...state,
                ingredients: Ingredients
            }; 
        
            // action.payload jest indexem tablicy ingredients
            // nie jest obiektem wiec nie ma klucza w postaci index:number, jest tylko number
        case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]}
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };     
        default:
            return state;     
    }
}

//   w case ADD_INGREDIENTS action.payload tez musi być rozbita na
//  pojedyncze akcje (elementy w tablicy Ingredients[]) 
// tak żeby dotrzeć do każdego elementu indywidualnie
