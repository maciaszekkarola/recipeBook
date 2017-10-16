import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../recipe-book.service';
import unsubscriber from '../../../shared/unsubscriber';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] ;
  subscriptions: Subscription[] = [];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscriptions.push(this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    ));
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    unsubscriber(this.subscriptions);
  }
  
  onNewRecipe() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['new'], {relativeTo: this.route});
    }else {
      this.router.navigate(['../signin'], {relativeTo: this.route});
    }
  }

  
}
