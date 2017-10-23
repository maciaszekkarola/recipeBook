import { Store } from '@ngrx/store';
import { Recipe } from './../../../models/recipe.model';
import { Ingredient } from './../../../models/ingredient.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private storeRecipe: Store<fromRecipe.FeatureState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );

  }

    private initForm() {
      let recipeName = '';
      let recipeImgPath = '';
      let description = '';
      let ingrName = new FormArray([]);

      if (this.editMode) {
        this.storeRecipe.select('recipes')
          .take(1)
          .subscribe(
            (recipeState: fromRecipe.State) => {
              // najpierw fetch recipe a potem operacje na przepisie
              const recipe = recipeState.recipes[this.id];
              recipeName = recipe.name; 
              recipeImgPath = recipe.imagePath;
              description = recipe.description;
      
              if (recipe['ingredients']) {
                for (const ingredient of recipe.ingredients) {
                  ingrName.push(
                    new FormGroup({
                      'name': new FormControl(ingredient.name, Validators.required),
                      'amount': new FormControl(ingredient.amount, [
                        Validators.required,
                        Validators.pattern(/^[1-9]+[0-9]*$/)
                      ])
                    })
                  );
                }
              }

            }
          );
        
      }

      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImgPath, Validators.required),
        'description' : new FormControl(description, Validators.required),
        'ingredients': ingrName
      });
    }

    onSubmit() {
      const newRecipe = new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients']);

      if (this.editMode) {
        this.storeRecipe.dispatch(new RecipeActions.UpdateRecipe({
          index: this.id,
          updatedRecipe: newRecipe
        }))
      } else {
        this.storeRecipe.dispatch(new RecipeActions.AddRecipe(newRecipe))
        this.router.navigate(['../'], {relativeTo: this.route});
      }
      this.onCancel();
    }

    onAddIngr() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    }

    onDeleteIngrItem(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
      
    }

    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route});
    }

    

    


}
