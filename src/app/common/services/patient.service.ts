import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ResponseModel } from '../models/response';
import { Problem, Session } from '../models';
import { CreateProblemRequest, SetProblemSpecialistRequest } from '../models/request';

@Injectable()
export class PatientService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getProblems() {
        return this.get<DataResponse<Problem[]>>(`${this.apiUrl}/patient/problems`);
    }

    public getProblem(problemID: number) {
        return this.get<DataResponse<Problem>>(`${this.apiUrl}/patient/problems/${problemID}`);
    }

    public getSessions(problemID: number) {
        return this.get<DataResponse<Session[]>>(`${this.apiUrl}/patient/problems/${problemID}/sessions`);
    }

    public createProblem(request: CreateProblemRequest) {
        return this.post<DataResponse<Problem>>(`${this.apiUrl}/patient/problems`, request);
    }

    public setProblemSpecialist(request: SetProblemSpecialistRequest, problemID: number) {
        return this.post<ResponseModel>(`${this.apiUrl}/patient/problems/${problemID}/specialist`, request);
    }
}