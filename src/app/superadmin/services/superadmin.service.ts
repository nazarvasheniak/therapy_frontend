import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/common/services';
import { ChangeCustomerRoleRequest, GetAdministratorsListRequest, GetPatientsListRequest, GetSpecialistsListRequest } from '../models/request';
import { GetAdministratorsListResponse, GetPatientListResponse, GetSpecialistsListResponse } from '../models/response';
import { DataResponse } from 'src/app/common/models/response';
import { SuperadminCustomerCard } from '../models';

@Injectable()
export class SuperadminService extends BaseHttpService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getPatientsList(query: GetPatientsListRequest) {
        const url = `/superadmin/customers/patients?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&sortBy=${query.sortBy}&orderBy=${query.orderBy}&searchQuery=${query.searchQuery}`;
        return this.get<GetPatientListResponse>(url);
    }

    public getSpecialistsList(query: GetSpecialistsListRequest) {
        const url = `/superadmin/customers/specialists?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&sortBy=${query.sortBy}&orderBy=${query.orderBy}&searchQuery=${query.searchQuery}`;
        return this.get<GetSpecialistsListResponse>(url);
    }

    public getAdministratorsList(query: GetAdministratorsListRequest) {
        const url = `/superadmin/customers/administrators?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&orderBy=${query.orderBy}&searchQuery=${query.searchQuery}`;
        return this.get<GetAdministratorsListResponse>(url);
    }

    public getCustomer(customerID: number) {
        return this.get<DataResponse<SuperadminCustomerCard>>(`/superadmin/customers/${customerID}`)
            .map(response => response.data);
    }

    public changeCustomerRole(request: ChangeCustomerRoleRequest, customerID: number) {
        return this.put<DataResponse<SuperadminCustomerCard>>(`/superadmin/customers/${customerID}/role`, request)
            .map(response => response.data);
    }
}