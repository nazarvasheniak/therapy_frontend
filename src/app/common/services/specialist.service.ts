import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, WebinarResponse, ResponseModel } from '../models/response';
import { Specialist, SpecialistProfile, Session } from '../models';
import { ChangeSpecialistPriceRequest } from '../models/request';

@Injectable()
export class SpecialistService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getSpecialistInfo() {
        return this.get<DataResponse<Specialist>>(`${this.apiUrl}/specialist/info`);
    }
    
    public getSpecialistProfile() {
        return this.get<DataResponse<SpecialistProfile>>(`${this.apiUrl}/specialist/profile`)
            .map(response => response.data);
    }

    public changeSpecialistPrice(request: ChangeSpecialistPriceRequest) {
        return this.post<ResponseModel>(`${this.apiUrl}/specialist/price`, request);
    }

    public getActiveSessions() {
        return this.get<DataResponse<Session[]>>(`${this.apiUrl}/specialist/sessions/active`)
            .map(response => response.data);
    }
}