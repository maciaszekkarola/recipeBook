import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { RecipeService } from './../recipe-book/recipe-book.service';
import { Response } from '@angular/http';
import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService, 
              private slService: ShoppingListService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    this.dataStorageService.storeShopingList()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );  
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
    this.dataStorageService.fetchShoppingList();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate( ['../'], {relativeTo: this.route});
  }
}
