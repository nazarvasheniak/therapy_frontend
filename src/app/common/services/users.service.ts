import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/response';
import { User } from '../models';

@Injectable()
export class UsersService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getUserInfo() {
        return this.get<DataResponse<User>>(`${this.apiUrl}/users/info`)
            .map(response => response.data);
    }
}