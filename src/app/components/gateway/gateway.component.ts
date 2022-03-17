import { Component, OnInit } from '@angular/core';
import { Gateway } from '../../common/models';
import { GatewayService, HandleErrorService } from '../../common/services';
import { retry, catchError } from 'rxjs';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {

  displayedColumns: string[] = ['serialNumber', 'name', 'address', 'devices'];
  gateways: Gateway[] = [];

  constructor(
    private gatewayService: GatewayService,
    private errorService: HandleErrorService) { }

  ngOnInit() {
    this.getGateways();
  }

  getGateways() {
    this.gatewayService.getGateways()
        .pipe(
          retry(1),
          catchError(this.errorService.handleError)
        )
        .subscribe(gateways => this.gateways = gateways);
  }
}
