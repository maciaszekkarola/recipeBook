import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { HomeRecipeComponent } from './home-recipe/home-recipe.component';
import { RecipeBookComponent } from 'app/components/recipe-book/recipe-book.component';
import { AuthGuard } from 'app/components/auth/auth-guard.service';

const recipesRoutes: Routes = [
    {path: '', component: RecipeBookComponent, children: [
        {path: '', component: HomeRecipeComponent},
        {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]},
];


@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule {

}