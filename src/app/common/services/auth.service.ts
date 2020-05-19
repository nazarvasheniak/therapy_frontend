import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { BaseHttpService } from './base-http.service';
import { LocalStorageHelper } from '../helpers';
import { SignInRequest, SignInConfirmRequest } from '../models/request';
import { ResponseModel, SignInResponse, SignInConfirmResponse } from '../models/response';

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
    private saveToken(response: SignInConfirmResponse): SignInConfirmResponse {
        if (!response) return;
        
        if (response.token) {
            LocalStorageHelper.saveToken(response.token);
            this.loginSubject.next(true);
        }

        return response;
    }

    public signIn(request: SignInRequest) {
        return this.post<SignInResponse>(`${this.apiUrl}/auth/sign-in`, request);
    }

    public signInConfirm(request: SignInConfirmRequest) {
        return this.post<SignInConfirmResponse>(`${this.apiUrl}/auth/sign-in/confirm`, request)
            .map(response => this.saveToken(response));
    }
}