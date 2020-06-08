import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/response';
import { Article } from '../models';

@Injectable()
export class ArticlesService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getArticles() {
        return this.get<DataResponse<Article[]>>(`${this.apiUrl}/articles`);
    }

    public getArticle(id: number) {
        return this.get<DataResponse<Article>>(`${this.apiUrl}/articles/${id}`);
    }
}