import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from 'app/components/auth/signup/signup.component';
import { SigninComponent } from 'app/components/auth/signin/signin.component';
import { LogoutComponent } from 'app/components/auth/logout/logout.component';


@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule {

}