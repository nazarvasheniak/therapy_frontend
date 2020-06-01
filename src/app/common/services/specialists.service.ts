import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/response';
import { Specialist } from '../models';

@Injectable()
export class SpecialistsService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getSpecialists() {
        return this.get<DataResponse<Specialist[]>>(`${this.apiUrl}/specialists`);
    }
}