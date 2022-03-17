import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models';
import { ClientConfig } from '../client-config';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }

  getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(
      `${ClientConfig.baseUrl}/api/Device/GetAll`);
  }

  deleteDevice(id: string): Observable<any> {
    return this.httpClient.delete<Device>(
      `${ClientConfig.baseUrl}/api/Device/${id}`);
  }
}
