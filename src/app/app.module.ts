import { AuthModule } from './components/auth/auth.module';
import { ShoppingModule } from './components/shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { AuthService } from './components/auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './components/recipe-book/recipe-book.service';
import { AuthGuard } from './components/auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ShoppingModule,
    AuthModule,
    SharedModule
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
