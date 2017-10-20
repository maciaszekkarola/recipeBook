import { Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
    email: string;
    password: string;
}

const initialState: State = {
    token: null,
    authenticated: false,
    email: null,
    password: null
}

// w tym przypadku z racji ze czynnosc autektykacji jest powtarzalna moge wrzucic case pod case
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {

        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state, 
                authenticated: true
            }

        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false

            } 
        case AuthActions.SET_TOKEN:
            return {
                ...state,

            }        

        default:
        return state; 
    }
}
