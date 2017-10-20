import { LoggingInterceptor } from './shared/logging.interceptor';
import { AuthModule } from './components/auth/auth.module';
import { ShoppingModule } from './components/shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { AuthService } from './components/auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './components/recipe-book/recipe-book.service';
import { AuthGuard } from './components/auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from 'app/components/shopping-list/store/shopping-list.reducers';
import { AuthInterceptor } from './shared/auth.interceptor';

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
    RecipeService, 
    DataStorageService,
    AuthService, 
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
