import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetBaseURL, Endpoints } from '../../endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private http: HttpClient) { }

  DoRegisterOrganization(obj: any) {
    return this.http.post<any>(GetBaseURL() + Endpoints.Organization.Register, obj);
  }

  DoLogin(obj: any) {
    return this.http.post<any>(GetBaseURL() + Endpoints.Organization.Login, obj);
  }
}
