import { Service } from "../setup/base.service";

type State = {
  cardNumber: string;
  deviceId: string;
  guid: string;
  shouldGenerateGUID: boolean;
};

const CARD_NUMBER = 'V00347833';
const DEVICE_ID = '8d20fc96-1b0e-4982-8292-e97caed114ec';
const GUID = '2L8';

export class FormService extends Service<State> {
  public state: State = { cardNumber: CARD_NUMBER, deviceId: DEVICE_ID, guid: GUID, shouldGenerateGUID: false };

  init() {
    this.state.cardNumber = localStorage.getItem('cardNumber') || CARD_NUMBER;
    this.state.deviceId = localStorage.getItem('deviceId') || DEVICE_ID;
    this.state.guid = localStorage.getItem('guid') || GUID;
    this.state.shouldGenerateGUID = localStorage.getItem('shouldGenerateGUID') === 'true';

    if (this.state.shouldGenerateGUID) {
      this.generateGUID();
    }
  }

  setCardNumber(cardNumber: string) {
    const value = cardNumber.toUpperCase();
    this.state.cardNumber = value;
    localStorage.setItem('cardNumber', value);
  }

  setDeviceId(deviceId: string) {
    this.state.deviceId = deviceId;
    localStorage.setItem('deviceId', deviceId);
  }
  
  setGuid(guid: string) {
    const value = guid.toUpperCase();
    this.state.guid = value;
    localStorage.setItem('guid', value);
  }

  setShouldGenerateGUID(shouldGenerateGUID: boolean) {
    this.state.shouldGenerateGUID = shouldGenerateGUID;
    localStorage.setItem('shouldGenerateGUID', shouldGenerateGUID.toString());
  }

  private generateGUID() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.state.guid = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    localStorage.setItem('guid', this.state.guid);
  }
}