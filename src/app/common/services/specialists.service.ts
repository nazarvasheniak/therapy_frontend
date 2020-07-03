import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ListResponse } from '../models/response';
import { Specialist, Review } from '../models';
import { GetList } from '../models/request';

@Injectable()
export class SpecialistsService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getSpecialists(query: GetList) {
        return this.get<ListResponse<Specialist>>(`${this.apiUrl}/specialists?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
    }

    public getSpecialist(specialistID: number) {
        return this.get<DataResponse<Specialist>>(`${this.apiUrl}/specialists/${specialistID}`);
    }
}