import { Component, OnInit } from '@angular/core';
import { DeviceService, HandleErrorService } from '../../common/services';
import { DeviceWithGateway } from './../../common/models';
import { retry, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'uid', 'vendor', 'gateway', 'status', 'createdDate', 'action'
  ];

  constructor(
    private deviceService: DeviceService,
    private errorService: HandleErrorService) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this.deviceService.getDevices()
        .pipe(
          retry(1),
          catchError(this.errorService.handleError)
        )
        .subscribe(devices => {
          this.dataSource.data = devices;
        });
  }

  getDeviceByUID(uid: string) {
    this.deviceService.deleteDevice(uid)
        .pipe(
          retry(1),
          catchError(this.errorService.handleError)
        )
        .subscribe(_ => this.getDevices());
  }



}
