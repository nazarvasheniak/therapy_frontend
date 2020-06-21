import { ResponseModel } from './response.model';

export class ListResponse<T> extends ResponseModel {
    public data: T[];
    public pageSize: number;
    public currentPage: number;
    public totalPages: number;
}