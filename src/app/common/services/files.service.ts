import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { UploadFileRequest, UploadFileFormRequest } from '../models/request';
import { DataResponse } from '../models/response';
import { File, RequestOptions } from '../models';

@Injectable()
export class FilesService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getFile(fileID: number) {
        return this.get<DataResponse<File>>(`/files/${fileID}`);
    }

    public uploadFile(request: UploadFileRequest) {
        return this.post<DataResponse<File>>('/files', request);
    }

    public uploadFileForm(request: UploadFileFormRequest) {
        const formData: FormData = new FormData();
        formData.append('file', request.file);

        return this.post<DataResponse<File>>('/files/form', formData);
    }
}