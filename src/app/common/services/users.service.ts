import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    
}