
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
import { HomeComponent } from './components/home/home.component';

import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './components/recipe-book/recipe-book.service';
import { AuthGuard } from './components/auth/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from './shared/auth.interceptor';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/auth/store/auth.effects';
import { LoggingInterceptor } from './shared/logging.interceptor';

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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
    
  ],
  providers: [
    RecipeService, 
    DataStorageService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
