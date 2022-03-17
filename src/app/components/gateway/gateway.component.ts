import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Gateway } from '../../common/models';
import { GatewayService, HandleErrorService } from '../../common/services';
import { retry, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements AfterViewInit  {

  displayedColumns: string[] = ['serialNumber', 'name', 'address', 'devices'];
  dataSource = new MatTableDataSource();

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private gatewayService: GatewayService,
    private errorService: HandleErrorService) { }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.getGateways();
  }

  getGateways() {
    this.gatewayService.getGateways()
        .pipe(
          retry(1),
          catchError(this.errorService.handleError)
        )
        .subscribe(gateways => this.dataSource.data = gateways);
  }
}
