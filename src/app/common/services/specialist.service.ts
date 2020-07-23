import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, WebinarResponse, ResponseModel, ListResponse } from '../models/response';
import { Specialist, SpecialistProfile, Session, ClientCard } from '../models';
import { ChangeSpecialistPriceRequest, GetList } from '../models/request';

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

    public getClients(query: GetList) {
        return this.get<ListResponse<ClientCard>>(`${this.apiUrl}/specialist/clients?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`);
    }

    public getClient(clientID: number) {
        return this.get<DataResponse<ClientCard>>(`${this.apiUrl}/specialist/clients/${clientID}`)
            .map(response => response.data);
    }

    public getSessions(query: GetList) {
        return this.get<ListResponse<Session>>(`${this.apiUrl}/specialist/sessions?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`);
    }
}