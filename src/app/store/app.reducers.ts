import { recipeReducer } from 'app/components/recipe-book/store/recipe.reducers';
import * as fromAuthReducer from 'app/components/auth/store/auth.reducers';
// import * as fromRecipes from '../../app/components/recipe-book/store/recipe.reducers';
import * as fromShoppingListReducer from 'app/components/shopping-list/store/shopping-list.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingListReducer.State;
    auth: fromAuthReducer.State;
    // recipes: fromRecipes.State;
}

// globalny typ stanu umiesczony w AppState


// opcja eby w app module nie wrzucam pojedynczych storow i referncji tylko by je zebac wszystkie do kupy
// pierwsza czesc to nazwa ktora bede sie poslugiwac przy select(), a druga to odpowiedni reducer
// potem w app.module odnosze sie do mapy reducerow StoreModule.forRoot(reducers),

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingListReducer.shoppingListReducer,
    auth: fromAuthReducer.authReducer,
    // recipes: fromRecipes.recipeReducer
}

