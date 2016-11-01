import { Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {User} from "./user";
import {Headers} from "angular2/src/http/headers";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
@Injectable()

//Create an authorization service to log users in and out. This service can be used by the entire app
export class AuthService {
    constructor(private _http: Http){

    }
    signup(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post('http://localhost:3000/user', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
    logout() {
        localStorage.clear();
    }
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}