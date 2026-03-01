import { useEffect } from 'react';
import styled from 'styled-components';
import { useService } from '../cortex/setup/setup';

export function QRScanner() {
  const { scanning, error, success, startScanner, stopScanner } = useService('scanner');
  const regionId = 'qr-scanner-region';

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return (
    <Container>
      <ScannerRegion id={regionId} $visible={scanning} />

      {!scanning ? (
        <ScanButton type="button" onClick={() => startScanner(regionId)}>
          Scanner un QR code
        </ScanButton>
      ) : (
        <StopButton type="button" onClick={stopScanner}>
          Arrêter le scan
        </StopButton>
      )}

      {success && <SuccessMessage>{success}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const ScannerRegion = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 350px;
  border-radius: 12px;
  overflow: hidden;
  display: ${(p) => (p.$visible ? 'block' : 'none')};

  & video {
    border-radius: 12px;
  }
`;

const buttonBase = `
  width: 100%;
  padding: 0.7em 1.5em;
  border-radius: 10px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:active {
    transform: scale(0.97);
  }
`;

const ScanButton = styled.button`
  ${buttonBase}
  background: #646cff;
  color: #fff;

  &:hover {
    background: #535bf2;
  }
`;

const StopButton = styled.button`
  ${buttonBase}
  background: #444;
  color: #ccc;

  &:hover {
    background: #555;
  }
`;

const SuccessMessage = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #4ade80;
  text-align: center;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #f87171;
  text-align: center;
`;
