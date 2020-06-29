import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ListResponse, ResponseModel } from '../models/response';
import { Article, ArticleComment } from '../models';
import { CreateUpdateArticleRequest, GetList, CreateArticleCommentRequest } from '../models/request';

@Injectable()
export class ArticlesService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getArticles(query: GetList) {
        return this.get<ListResponse<Article>>(`${this.apiUrl}/articles?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
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

    public likeArticle(id: number) {
        return this.post<ResponseModel>(`${this.apiUrl}/articles/${id}/like`, {});
    }

    public commentArticle(request: CreateArticleCommentRequest, id: number) {
        return this.post<DataResponse<ArticleComment>>(`${this.apiUrl}/articles/${id}/comment`, request);
    }
}