import { Html5Qrcode } from 'html5-qrcode';
import { Service } from '../setup/base.service';

export type State = {
  scanning: boolean;
  error: string | null;
  success: string | null;
};

export class ScannerService extends Service<State> {
  state: State = { scanning: false, error: null, success: null };

  private scanner: Html5Qrcode | null = null;

  parseQrData(data: string): { cardNumber: string; guid: string } | null {
    const parts = data.split(':');
    if (parts.length >= 3 && parts[0] === 'GM2') {
      return { cardNumber: parts[1], guid: parts[2] };
    }
    return null;
  }

  async stopScanner() {
    if (this.scanner?.isScanning) {
      await this.scanner.stop();
    }
    this.scanner = null;
    this.state.scanning = false;
  }

  async startScanner(regionId: string) {
    this.state.error = null;
    this.state.success = null;

    try {
      const scanner = new Html5Qrcode(regionId);
      this.scanner = scanner;
      this.state.scanning = true;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          const result = this.parseQrData(decodedText);
          if (result) {
            this.state.success = `Carte ${result.cardNumber} — GUID ${result.guid}`;
            const form = this.getService('form');
            form.setCardNumber(result.cardNumber);
            form.setGuid(result.guid);
            this.stopScanner();
          } else {
            this.state.error = 'QR code non reconnu (format attendu : GM2:…)';
          }
        },
        () => {},
      );
    } catch {
      this.state.error = "Impossible d'accéder à la caméra";
      this.state.scanning = false;
    }
  }
}
