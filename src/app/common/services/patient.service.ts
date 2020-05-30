import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/response';
import { Problem, Session } from '../models';

@Injectable()
export class PatientService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getProblems() {
        return this.get<DataResponse<Problem[]>>(`${this.apiUrl}/patient/problems`);
    }

    public getSessions(problemID: number) {
        return this.get<DataResponse<Session[]>>(`${this.apiUrl}/patient/problems/${problemID}/sessions`);
    }
}