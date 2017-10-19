import { AuthModule } from './components/auth/auth.module';
import { ShoppingModule } from './components/shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { AuthService } from './components/auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './components/recipe-book/recipe-book.service';
import { AuthGuard } from './components/auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from 'app/components/shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    
  ],
  providers: [
    ShoppingListService, 
    RecipeService, 
    DataStorageService,
    AuthService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
