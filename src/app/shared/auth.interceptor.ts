import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthService } from './../components/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app.reducers'; 
import * as fromAuth from '../components/auth/store/auth.reducers';

@Injectable()


export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);

        // take(1) jest funkcj ktra powoduje ze wykona sie tylko raz! w tym przypadku ma to znaczenie to token za 
        return this.store.select('auth')
                .take(1)
                .switchMap((authState: fromAuth.State) => {
                    const copiedReq = req.clone({params: req.params.set('auth', authState.token )});
                    return next.handle(copiedReq);
                })

    }
 }


