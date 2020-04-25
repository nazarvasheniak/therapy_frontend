import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { BaseHttpService } from '../../common/services/base-http.service';
import { LocalStorageHelper } from '../../common/helpers';
import { Router } from '@angular/router';
import { SignInRequest } from '../../common/models/request';
import { ResponseModel } from '../../common/models/response';

@Injectable()
export class AuthService extends BaseHttpService {

    private loginSubject: BehaviorSubject<boolean>;

    constructor(http: HttpClient, private router: Router) {
        super(http);
        this.checkAuth();
    }

    // Check is user logged in
    private checkAuth() {
        const token = LocalStorageHelper.getToken();
        this.loginSubject = new BehaviorSubject<boolean>(token ? true : false);
    }

    // Logout method
    public logout(): void {
        LocalStorageHelper.removeToken();
        // LocalStorageHelper.removeSymbols();
        this.loginSubject.next(false);
        this.router.navigate(['/sign-in']);
    }

    // Check is user logged in now
    public get isLoggedIn(): Observable<boolean> {
        return this.loginSubject.asObservable()
            .map((logged) => {
                if (!logged) {
                    return false;
                }

                return true;
            });
    }

    // Save token to localStorage
    /* private saveToken(response: AuthResponse): AuthResponse {
        if (!response) return;
        
        if (response.token) {
            LocalStorageHelper.saveToken(response.token);
            this.loginSubject.next(true);
        }

        return response;
    } */

    public signIn(request: SignInRequest) {
        return this.post<ResponseModel>(`${this.apiUrl}/auth/sign-in`, request);
    }
}