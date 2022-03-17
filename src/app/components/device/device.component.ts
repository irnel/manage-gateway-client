import { Component, OnInit } from '@angular/core';
import { DeviceService, HandleErrorService } from '../../common/services';
import { retry, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDeviceDialogComponent } from '../../components';

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
    private errorService: HandleErrorService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getDevices();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddDeviceDialogComponent, dialogConfig);
}

  getDevices() {
    this.deviceService.getDevices()
        .pipe(
          retry(1),
          catchError(this.errorService.handleError)
        )
        .subscribe(devices => this.dataSource.data = devices);
  }

  removeDevice(uid: string) {
    this.deviceService.deleteDevice(uid)
        .pipe(
          retry(1),
          catchError(this.errorService.handleError)
        )
        .subscribe(_ => this.getDevices());
  }



}
