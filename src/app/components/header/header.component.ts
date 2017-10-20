import { State } from './../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe-book/recipe-book.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers'; 
import * as fromAuth from '../auth/store/auth.reducers'; 
import * as AuthActions from '../auth/store/auth.actions'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth')
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    // this.dataStorageService.storeShopingList()
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //     }
    //   );  
    
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
    this.dataStorageService.fetchShoppingList();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate( ['/'], {relativeTo: this.route});
  }
}
