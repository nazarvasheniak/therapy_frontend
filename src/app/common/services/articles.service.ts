import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/response';
import { Article } from '../models';
import { CreateUpdateArticleRequest } from '../models/request';

@Injectable()
export class ArticlesService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getArticles() {
        return this.get<DataResponse<Article[]>>(`${this.apiUrl}/articles`);
    }

    public getMyArticles() {
        return this.get<DataResponse<Article[]>>(`${this.apiUrl}/articles/my`);
    }

    public getArticle(id: number) {
        return this.get<DataResponse<Article>>(`${this.apiUrl}/articles/${id}`);
    }

    public createArticle(request: CreateUpdateArticleRequest) {
        return this.post<DataResponse<Article>>(`${this.apiUrl}/articles`, request);
    }

    public updateArticle(request: CreateUpdateArticleRequest, id: number) {
        return this.put<DataResponse<Article>>(`${this.apiUrl}/articles/${id}`, request);
    }
}