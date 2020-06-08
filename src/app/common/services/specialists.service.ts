import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/response';
import { Specialist, Review } from '../models';

@Injectable()
export class SpecialistsService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getSpecialists() {
        return this.get<DataResponse<Specialist[]>>(`${this.apiUrl}/specialists`);
    }

    public getSpecialist(specialistID: number) {
        return this.get<DataResponse<Specialist>>(`${this.apiUrl}/specialists/${specialistID}`);
    }

    public getSpecialistReviews(specialistID: number) {
        return this.get<DataResponse<Review[]>>(`${this.apiUrl}/specialists/${specialistID}/reviews`);
    }

    public getSpecialistRating(specialistID: number) {
        return this.get<DataResponse<number>>(`${this.apiUrl}/specialists/${specialistID}/rating`);
    }
}