import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from 'app/components/auth/signup/signup.component';
import { SigninComponent } from 'app/components/auth/signin/signin.component';
import { LogoutComponent } from 'app/components/auth/logout/logout.component';

const authRoutes: Routes = [
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'logout', component: LogoutComponent},
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}