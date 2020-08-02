import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ListResponse, ResponseModel } from '../models/response';
import { Article, ArticleComment } from '../models';
import { CreateUpdateArticleRequest, GetList, CreateArticleCommentRequest } from '../models/request';

@Injectable()
export class ArticlesService extends BaseHttpService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getArticles(query: GetList) {
        return this.get<ListResponse<Article>>(`/articles?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
    }

    public getArticle(id: number) {
        return this.get<DataResponse<Article>>(`/articles/${id}`);
    }

    public getMyArticles(query: GetList) {
        return this.get<ListResponse<Article>>(`/articles/my?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
    }

    public createArticle(request: CreateUpdateArticleRequest) {
        return this.post<DataResponse<Article>>(`/articles`, request);
    }

    public updateArticle(request: CreateUpdateArticleRequest, id: number) {
        return this.put<DataResponse<Article>>(`/articles/${id}`, request);
    }

    public deleteArticle(articleID: number) {
        return this.delete<ResponseModel>(`/articles/${articleID}`)
    }

    public likeArticle(id: number) {
        return this.post<ResponseModel>(`/articles/${id}/like`, {});
    }

    public commentArticle(request: CreateArticleCommentRequest, id: number) {
        return this.post<DataResponse<ArticleComment>>(`/articles/${id}/comment`, request);
    }
}