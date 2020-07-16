import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ResponseModel, CreateSessionResponse } from '../models/response';
import { Problem, Session } from '../models';
import { CreateProblemRequest, CreateSessionRequest } from '../models/request';

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

    public createProblemSession(request: CreateSessionRequest, problemID: number) {
        return this.post<CreateSessionResponse>(`${this.apiUrl}/patient/problems/${problemID}/sessions`, request);
    }

    public startSession(problemID: number, sessionID: number) {
        return this.post<ResponseModel>(`${this.apiUrl}/patient/problems/${problemID}/sessions/${sessionID}/start`, {});
    }

    public changeSessionSpecialist(request: CreateSessionRequest, problemID: number, sessionID: number) {
        return this.put<ResponseModel>(`${this.apiUrl}/patient/problems/${problemID}/sessions/${sessionID}`, request);
    }
}