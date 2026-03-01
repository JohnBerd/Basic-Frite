import { Service } from '../setup/base.service';
import * as crypto from 'crypto-js';
import QRCode from 'qrcode';

export type State = {
  qrCodeData: string;
  qrCodeImage: string;
};

export class HashService extends Service<State> {
  state: State = { qrCodeData: '', qrCodeImage: '' };

  init() {
    this.generateQrCodeData();
    setInterval(() => {
      this.generateQrCodeData();
    }, 5000);
  }

  async generateQrCodeData() {
    if (!this.getService('form').state.cardNumber || !this.getService('form').state.deviceId || !this.getService('form').state.guid) {
      throw new Error('Card number, device id and guid are required');
    }
    const hash = await this.generateHash();
    this.state.qrCodeData = `GM2:${this.getService('form').state.cardNumber}:${this.getService('form').state.guid}:${this.getTimestamp()}:${hash}`;
    this.state.qrCodeImage = await QRCode.toDataURL(this.state.qrCodeData, {
      width: 250,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    });
  }

  private getTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  private getDataToHash(cardNumber: string, guid: string, timestamp: number, deviceId: string) {
    return cardNumber + guid + timestamp + deviceId;
  }

  private async generateHash() {
    const dataToHash = this.getDataToHash(this.getService('form').state.cardNumber, this.getService('form').state.guid, this.getTimestamp(), this.getService('form').state.deviceId);
    const buffer = await crypto.SHA256(dataToHash)
    return buffer.toString().toUpperCase().slice(-8)
  }
} 

