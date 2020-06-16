import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { UploadFileRequest } from '../models/request';
import { DataResponse } from '../models/response';
import { File } from '../models';

@Injectable()
export class FilesService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public uploadFile(request: UploadFileRequest) {
        return this.post<DataResponse<File>>(`${this.apiUrl}/files`, request);
    }
}