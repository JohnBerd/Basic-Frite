import { Service } from "../setup/base.service";

type State = {
  cardNumber: string;
  deviceId: string;
  guid: string;
};

const CARD_NUMBER = 'V00347833';
const DEVICE_ID = '8d20fc96-1b0e-4982-8292-e97caed114ec';
const GUID = '2L8';

export class FormService extends Service<State> {
  public state: State = { cardNumber: CARD_NUMBER, deviceId: DEVICE_ID, guid: GUID };

  init() {
    this.state.cardNumber = localStorage.getItem('cardNumber') || CARD_NUMBER;
    this.state.deviceId = localStorage.getItem('deviceId') || DEVICE_ID;
    this.state.guid = localStorage.getItem('guid') || GUID;
  }

  setCardNumber(cardNumber: string) {
    this.state.cardNumber = cardNumber;
    localStorage.setItem('cardNumber', cardNumber);
  }

  setDeviceId(deviceId: string) {
    this.state.deviceId = deviceId;
    localStorage.setItem('deviceId', deviceId);
  }
  
  setGuid(guid: string) {
    this.state.guid = guid;
    localStorage.setItem('guid', guid);
  }
}