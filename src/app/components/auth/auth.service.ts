import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {
    token: string;

    constructor(private router: Router,
                private route: ActivatedRoute) { }
    
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            (response) => {
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
                    this.router.navigate( ['../recipes/0'] , {relativeTo: this.route});
                    firebase.auth().currentUser.getToken()
                        .then(
                            (token: string) => this.token = token
                        );
                }
            )
            .catch(
                error => console.log(error.message)
            );
    }

    getToken() {
        firebase.auth().currentUser.getToken()
            .then(
                (token: string) => this.token = token
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['../logout'], {relativeTo: this.route});
    }

    
}
