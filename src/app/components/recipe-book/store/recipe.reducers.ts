import { Ingredient } from '../../../models/ingredient.model';
import { Recipe } from '../../../models/recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../../store/app.reducers';

// only in lazy loading!!
// rozszerzam klasę o podstawowy AppState
export interface FeatureState extends fromApp.AppState {
    recipes: State
}
export interface State {
    recipes: Recipe[];
    editedRecipe: Recipe
    editedRecipeIndex: number;
}

const initialState: State = {
    editedRecipe: null,
    editedRecipeIndex: -1,
    recipes: [
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
    ]    

}
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [ action.payload]
            };

        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes,
                
            };

        case RecipeActions.DELETE_RECIPE:
            const recipesOld = [...state.recipes];
            recipesOld.splice(action.payload, 1);
            return {
                ...state,
                recipes: recipesOld,
            };
        default:
            return state;
        
    }
}
