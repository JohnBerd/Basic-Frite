import styled, { keyframes } from 'styled-components';
import { useService } from '../cortex/setup/setup';

const REFRESH_INTERVAL_MS = 5000;

type QRCodeTabProps = {
  onOpenSetup: () => void;
};

export function QRCodeTab({ onOpenSetup }: QRCodeTabProps) {
  const { qrCodeImage } = useService('hash');
  const { cardNumber } = useService('form');

  return (
    <Container>
      <QRFrame>
        <QRInner>
          {qrCodeImage ? (
            <img src={qrCodeImage} alt="QR Code" />
          ) : (
            <Placeholder>Generation en cours...</Placeholder>
          )}
        </QRInner>
        <CardBadge>CardNumber {cardNumber}</CardBadge>
      </QRFrame>

      {qrCodeImage && (
        <ProgressBarTrack>
          <ProgressBarFill key={qrCodeImage} $duration={REFRESH_INTERVAL_MS} />
        </ProgressBarTrack>
      )}

      <Title>TON QR CODE</Title>
      <Description>
        Le QR code te donne acces aux clubs et a tes extras. Lors du scan, garde une distance d'environ 20 cm.
      </Description>

      <InfoButton type="button" onClick={onOpenSetup}>
        COMMENT FONCTIONNE LE CODE
      </InfoButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 100vh;
  min-width: 100%;
  background: #faf5ef;
  padding: 2rem 1.5rem 2.5rem;
  box-sizing: border-box;
`;

const QRFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #e85d04;
  border-radius: 16px;
  padding: 1.25rem 1.25rem 0.75rem;
  background: #fff;
  position: relative;
`;

const QRInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Placeholder = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

const CardBadge = styled.div`
  background: #e85d04;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.3em 1em;
  border-radius: 4px;
  margin-top: 0.5rem;
  text-transform: uppercase;
`;

const grow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const ProgressBarTrack = styled.div`
  width: 220px;
  height: 4px;
  background: #e0d5c8;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $duration: number }>`
  height: 100%;
  background: #e85d04;
  border-radius: 2px;
  animation: ${grow} ${({ $duration }) => $duration}ms linear forwards;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: 0.02em;
  margin-top: 0.25rem;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #555;
  text-align: center;
  line-height: 1.45;
  margin: 0;
  max-width: 300px;
`;

const InfoButton = styled.button`
  background: #5a4fcf;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.85em 2em;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  width: 100%;
  max-width: 320px;
  margin-top: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #4a3fbf;
  }

  &:active {
    background: #3f35a8;
  }
`;

