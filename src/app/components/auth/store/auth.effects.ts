import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

@Injectable()

export class AuthEffects {
    @Effect()

    // tslint:disable-next-line:max-line-length
    // w ostatnim kroku uywam map by tablica obiektow krora otrzymam bylo od razu mozna przeksztalcic w Observable. a wlasciwie to mergeMap by zmegrowac wiece observabli w jeden
    // w Pzypadku SwitchMap dane 
    authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
        return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase
            .auth()
            .createUserWithEmailAndPassword(authData.username, authData.password))
    })
    .switchMap( () => {
        return fromPromise(firebase
            .auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
        this.router.navigate( ['/']);
        return [
            {type: AuthActions.SIGNUP},
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            } 
        ]
    });

    @Effect()
    authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
        return action.payload
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase
            .auth().signInWithEmailAndPassword(authData.username, authData.password))
    })
    .switchMap( () => {
        return fromPromise(firebase
            .auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
        this.router.navigate( ['/']);
        return [
            {type: AuthActions.SIGNIN},
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ]
    })

    // super wazne by dac blokowanie dispatcha! ten effekt ma nie wysylac nic do store!
    @Effect({dispatch: false})
    authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do( () => {
        this.router.navigate( ['/']);
    })



    constructor(private actions$: Actions,
                private router: Router) {}
}




