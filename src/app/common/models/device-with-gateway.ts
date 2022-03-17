import { Device, Gateway } from '../models';

export interface DeviceWithGateway extends Device {
  gateway: Gateway
}
