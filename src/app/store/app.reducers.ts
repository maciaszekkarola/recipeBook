import { recipeReducer } from 'app/components/recipe-book/store/recipe.reducers';
import * as fromAuthReducer from 'app/components/auth/store/auth.reducers';
import * as fromShoppingListReducer from 'app/components/shopping-list/store/shopping-list.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingListReducer.State;
    auth: fromAuthReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingListReducer.shoppingListReducer,
    auth: fromAuthReducer.authReducer,
}

