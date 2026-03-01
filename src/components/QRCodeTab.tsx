import styled, { keyframes } from 'styled-components';
import { useService } from '../cortex/setup/setup';

const REFRESH_INTERVAL_MS = 5000;

export function QRCodeTab() {
  const { qrCodeData, qrCodeImage } = useService('hash');

  return (
    <Container>
      <QRContainer>
        {qrCodeImage ? (
          <img src={qrCodeImage} alt="QR Code" />
        ) : (
          <Placeholder>Génération en cours…</Placeholder>
        )}
      </QRContainer>
      {qrCodeData && (
        <ProgressBarTrack>
          <ProgressBarFill key={qrCodeData} $duration={REFRESH_INTERVAL_MS} />
        </ProgressBarTrack>
      )}
      <DataText>{qrCodeData}</DataText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const QRContainer = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
`;

const Placeholder = styled.span`
  color: #aaa;
  font-size: 0.9rem;
`;

const grow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const ProgressBarTrack = styled.div`
  width: 250px;
  height: 4px;
  background: #2a2a2a;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $duration: number }>`
  height: 100%;
  background: #646cff;
  border-radius: 2px;
  animation: ${grow} ${({ $duration }) => $duration}ms linear forwards;
`;

const DataText = styled.p`
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #666;
  word-break: break-all;
  text-align: center;
  max-width: 100%;
  margin: 0;
  padding: 0.6em 1em;
  background: #1e1e1e;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
`;

