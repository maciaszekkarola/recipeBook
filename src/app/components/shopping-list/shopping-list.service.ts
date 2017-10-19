import { Ingredient } from './../../models/ingredient.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

export class ShoppingListService {
    ingrChanged = new Subject<Ingredient[]>();
    startedEditing =  new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 6),
        new Ingredient('Banana', 2),
        new Ingredient('Bread', 1)
    ];

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingrChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    getIngredients() {
        return this.ingredients.slice();
    }
   
    addIngredientsToList(ingredient: Ingredient[]) {
        this.ingredients.push(...ingredient);
        this.ingrChanged.next(this.ingredients.slice());
    }
   
    updateIngr(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingrChanged.next(this.ingredients.slice());
    }

    deleteIngr(index: number) {
        this.ingredients.splice(index, 1);
        this.ingrChanged.next(this.ingredients.slice());
    }

}
