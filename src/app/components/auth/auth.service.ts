import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import * as fromApp from '../../store/app.reducers'; 
import * as AuthActions from '../auth/store/auth.actions'; 

@Injectable()

export class AuthService {
    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<fromApp.AppState>) { }
    
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                this.store.dispatch(new AuthActions.Signup());
                this.router.navigate( ['../recipes/0'] , {relativeTo: this.route});
            }
        )
            .catch(
                error => console.log(error)
            );

    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.store.dispatch(new AuthActions.Signin());
                    this.router.navigate( ['../recipes/0'] , {relativeTo: this.route});
                    firebase.auth().currentUser.getToken()
                        .then(
                            (token: string) => 
                            this.store.dispatch(new AuthActions.SetToken(token))
                        );
                }
            )
            .catch(
                error => console.log(error.message)
            );
    }

    // getToken() {
    //     firebase.auth().currentUser.getToken()
    //         .then(
    //             (token: string) => this.token = token
    //     );
    //     return this.token;
    // }

    // isAuthenticated() {
    //     return this.token != null;
    // }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['../logout'], {relativeTo: this.route});
    }

    
}
