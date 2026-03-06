import { createCore } from '../setup/setup';

jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,mock'),
}));

const CARD_NUMBER = 'V011152386';
const GUID = 'NJJ';
const DEVICE_ID = '49322ca1-864a-4f37-b9b7-6fe97bea6ab3';

const localStorageMock = (() => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('HashService via Core', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each`
    expectedQrCode
    ${'GM2:V011152386:NJJ:1772324637:87448194'}
    ${'GM2:V011152386:NJJ:1772324647:08A749F2'}
    ${'GM2:V011152386:NJJ:1772324652:FAF6425D'}
    ${'GM2:V011152386:NJJ:1772324657:A8DFE52B'}
    ${'GM2:V011152386:NJJ:1772324662:06EADF83'}
    ${'GM2:V011152386:NJJ:1772324667:F916A142'}
    ${'GM2:V011152386:NJJ:1772324672:C816C11A'}
    ${'GM2:V011152386:NJJ:1772324677:6AB3647C'}
    ${'GM2:V011152386:NJJ:1772324682:D3212CF6'}
    ${'GM2:V011152386:NJJ:1772324687:33DFAA99'}
    ${'GM2:V011152386:NJJ:1772324692:6176FB4F'}
    ${'GM2:V011152386:NJJ:1772324697:508D8694'}
  `(
    'doit générer $expectedQrCode',
    async ({ expectedQrCode }: { expectedQrCode: string }) => {
      const timestamp = Number(expectedQrCode.split(':')[3]);
      jest.spyOn(Date, 'now').mockReturnValue(timestamp * 1000);

      const core = createCore();
      const formService = core.getService('form');
      const hashService = core.getService('hash');

      formService.state.cardNumber = CARD_NUMBER;
      formService.state.guid = GUID;
      formService.state.deviceId = DEVICE_ID;

      await hashService.generateQrCodeData();

      expect(hashService.state.qrCodeData).toBe(expectedQrCode);
    },
  );
});
