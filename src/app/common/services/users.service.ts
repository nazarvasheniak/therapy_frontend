import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ResponseModel } from '../models/response';
import { User } from '../models';
import { VerificationRequest } from '../models/request';

@Injectable()
export class UsersService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getUserInfo() {
        return this.get<DataResponse<User>>(`/users/info`)
            .map(response => response.data);
    }

    public userVerification(request: VerificationRequest) {
        const formData: FormData = new FormData();
        formData.append('document', request.document);
        formData.append('selfie', request.selfie);

        return this.post<ResponseModel>('/users/verification/request', formData);
    }
}