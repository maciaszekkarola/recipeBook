import * as fromAuthReducer from 'app/components/auth/store/auth.reducers';
import * as fromShoppingListReducer from 'app/components/shopping-list/store/shopping-list.reducers';

export interface AppState {
    shoppingList: fromShoppingListReducer.State;
    auth: fromAuthReducer.State;
}

// globalny typ stanu umiesczony w AppState
