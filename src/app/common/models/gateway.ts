import { Device } from './index';

export interface Gateway {
  serialNumber: string,
  name: string,
  address: string,
  devices: Device []
}
