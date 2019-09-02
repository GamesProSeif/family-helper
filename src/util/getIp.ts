import { networkInterfaces } from 'os';
import { IAddress } from '../typings';

export default (): IAddress[] => {
  const interfaces = networkInterfaces();
  const ipAddress: IAddress[] = [];
  for (const key in interfaces) {
    if (key) {
      for (const index in interfaces[key]) {
        if (
          interfaces[key][index].family === 'IPv4' &&
          !interfaces[key][index].internal
        ) {
          ipAddress.push({
            name: key,
            address: interfaces[key][index].address
          });
        }
      }
    }
  }
  ipAddress.push({ name: 'localhost', address: '127.0.0.1' });
  return ipAddress;
};
