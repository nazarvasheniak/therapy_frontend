import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, WebinarResponse, ResponseModel, ListResponse, ReviewsResponse } from '../models/response';
import { Specialist, SpecialistProfile, Session, ClientCard, SpecialistSession, ProblemAssets, ProblemImage } from '../models';
import { ChangeSpecialistPriceRequest, GetList, CreateUpdateProblemImageRequest } from '../models/request';

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
        return this.get<ListResponse<SpecialistSession>>(`${this.apiUrl}/specialist/sessions?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`);
    }

    public getReviews() {
        return this.get<ReviewsResponse>(`${this.apiUrl}/specialist/reviews`);
    }

    public getClientAssets(clientID: number, problemID: number) {
        return this.get<DataResponse<ProblemAssets>>(`${this.apiUrl}/specialist/clients/${clientID}/problems/${problemID}/assets`)
            .map(response => response.data);
    }

    public createClientProblemImage(request: CreateUpdateProblemImageRequest, clientID: number, problemID: number) {
        return this.post<DataResponse<ProblemImage[]>>(`${this.apiUrl}/specialist/clients/${clientID}/problems/${problemID}/images`, request)
            .map(response => response.data);
    }

    public updateClientProblemImage(request: CreateUpdateProblemImageRequest, clientID: number, problemID: number, imageID: number) {
        return this.put<DataResponse<ProblemImage[]>>(`${this.apiUrl}/specialist/clients/${clientID}/problems/${problemID}/images/${imageID}`, request)
            .map(response => response.data);
    }

    public hideClientProblemImage(clientID: number, problemID: number, imageID: number) {
        return this.delete<DataResponse<ProblemImage[]>>(`${this.apiUrl}/specialist/clients/${clientID}/problems/${problemID}/images/${imageID}`)
            .map(response => response.data);
    }

    public reloadClientProblemImage(clientID: number, problemID: number, imageID: number) {
        return this.patch<DataResponse<ProblemImage[]>>(`${this.apiUrl}/specialist/clients/${clientID}/problems/${problemID}/images/${imageID}`, {})
            .map(response => response.data);
    }
}