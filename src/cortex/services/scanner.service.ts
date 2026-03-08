import { Html5Qrcode } from 'html5-qrcode';
import { Service } from '../setup/base.service';

const SCANNER_REGION_ID = 'qr-scanner-region';

export type State = {
  scanning: boolean;
  error: string | null;
  verifyResult: 'match' | 'mismatch' | null;
  tooltip: string;
  iconColor: string;
};

const DEFAULT_TOOLTIP = 'Scanner un QR code pour importer les infos et vérifier le Device ID';

export class ScannerService extends Service<State> {
  state: State = {
    scanning: false,
    error: null,
    verifyResult: null,
    tooltip: DEFAULT_TOOLTIP,
    iconColor: '#888',
  };

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
    this.updateDerivedState();
  }

  toggleScan() {
    if (this.state.scanning) {
      this.stopScanner();
    } else {
      this.startScan();
    }
  }

  private async startScan() {
    await this.stopScanner();
    this.state.error = null;
    this.state.verifyResult = null;
    this.state.scanning = true;
    this.updateDerivedState();

    try {
      const scanner = new Html5Qrcode(SCANNER_REGION_ID);
      this.scanner = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          const parsed = this.parseQrData(decodedText);
          if (!parsed) {
            this.state.error = 'QR code non reconnu (format attendu : GM2:…)';
            return;
          }

          const form = this.getService('form');
          form.setCardNumber(parsed.cardNumber);
          form.setGuid(parsed.guid);

          const verification = this.getService('hash').verifyQrCode(decodedText);
          this.state.verifyResult = verification?.valid ? 'match' : 'mismatch';

          this.stopScanner();
        },
        () => {},
      );
    } catch {
      this.state.error = "Impossible d'accéder à la caméra";
      this.state.scanning = false;
      this.updateDerivedState();
    }
  }

  private updateDerivedState() {
    if (this.state.scanning) {
      this.state.tooltip = 'Scan en cours…';
      this.state.iconColor = '#888';
    } else if (this.state.verifyResult === 'match') {
      this.state.tooltip = 'Device ID vérifié — le hash correspond';
      this.state.iconColor = '#4ade80';
    } else if (this.state.verifyResult === 'mismatch') {
      this.state.tooltip = 'Device ID incorrect — le hash ne correspond pas';
      this.state.iconColor = '#f87171';
    } else {
      this.state.tooltip = DEFAULT_TOOLTIP;
      this.state.iconColor = '#888';
    }
  }
}

