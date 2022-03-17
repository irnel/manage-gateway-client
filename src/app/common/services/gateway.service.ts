import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Gateway } from '../models';
import { ClientConfig } from '../client-config';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    private httpClient: HttpClient) { }

  getGateways() : Observable<Gateway[]> {
    return this.httpClient.get<Gateway[]>(
      `${ClientConfig.baseUrl}/api/Gateway/GetAllWithInclude`
    );
  }


}
