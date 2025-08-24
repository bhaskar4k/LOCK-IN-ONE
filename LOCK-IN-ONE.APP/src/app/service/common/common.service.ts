import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints, GetBaseURL } from '../../endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }

  GetMenu() {
    return this.http.get<any>(GetBaseURL() + Endpoints.Common.Menu);
  }
}
