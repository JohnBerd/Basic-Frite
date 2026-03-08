import styled from 'styled-components';
import { useService } from '../cortex/setup/setup';

type SetupTabProps = {
  onBack: () => void;
};

export function SetupTab({ onBack }: SetupTabProps) {
  const { cardNumber, deviceId, guid, shouldGenerateGUID, setCardNumber, setDeviceId, setGuid, setShouldGenerateGUID } = useService('form');
  const { scanning, tooltip, iconColor, toggleScan } = useService('scanner');

  return (
    <PageWrapper>
      <BackButton type="button" onClick={onBack} aria-label="Retour">
        ✕
      </BackButton>
      <Container>
        <SectionTitle>Configuration</SectionTitle>
        <InfoCard>
          <InfoRow>
            <InfoLabel>Carte</InfoLabel>
            <InfoInput
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              aria-label="Numéro de carte"
            />
            <IconSpacer />
          </InfoRow>
          <Divider />
          <InfoRow>
            <InfoLabel>Device ID</InfoLabel>
            <InfoInput
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              aria-label="Device ID"
            />
            <ScanButtonWrapper>
              <ScanButton type="button" onClick={toggleScan} $color={iconColor} aria-label="Scanner un QR code">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <rect x="2" y="2" width="7" height="7" rx="1" />
                  <rect x="15" y="2" width="7" height="7" rx="1" />
                  <rect x="2" y="15" width="7" height="7" rx="1" />
                  <rect x="15" y="15" width="3.5" height="3.5" rx="0.5" />
                  <path d="M22 15h-3.5v3.5" />
                  <path d="M18.5 22H22v-3.5" />
                </svg>
              </ScanButton>
              <TooltipText>{tooltip}</TooltipText>
            </ScanButtonWrapper>
          </InfoRow>
          <ScannerRegion id="qr-scanner-region" $visible={scanning} />
          <Divider />
          <InfoRow>
            <InfoLabel>GUID</InfoLabel>
            <InfoInput
              type="text"
              value={guid}
              onChange={(e) => setGuid(e.target.value)}
              aria-label="GUID"
            />
            <IconSpacer />
          </InfoRow>
          <Divider />
          <InfoRow>
            <SwitchLabel>GUID aléatoire au démarrage</SwitchLabel>
            <Switch
              role="switch"
              aria-checked={shouldGenerateGUID}
              $active={shouldGenerateGUID}
              onClick={() => setShouldGenerateGUID(!shouldGenerateGUID)}
            >
              <SwitchThumb $active={shouldGenerateGUID} />
            </Switch>
            <IconSpacer />
          </InfoRow>
        </InfoCard>
    </Container>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  min-width: 100%;
  background: #141414;
  padding: 2rem 1.25rem 2rem;
  box-sizing: border-box;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #e8e8e8;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #2a2a2a;
    color: #fff;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 540px;
  margin: 0 auto;
  padding-top: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #e8e8e8;
`;

const InfoCard = styled.div`
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`;

const InfoLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: #888;
  white-space: nowrap;
`;

const InfoInput = styled.input`
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #ccc;
  text-align: right;
  word-break: break-all;
  flex: 1;
  min-width: 0;
  padding: 0.25em 0.5em;
  margin: -0.25em -0.5em;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  transition: border-color 0.2s, background 0.2s;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #333;
    background: #252525;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 0;
`;

const IconSpacer = styled.div`
  width: 24px;
  flex-shrink: 0;
`;

const ScanButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &:hover > span {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ScanButton = styled.button<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${(p) => p.$color};
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;

  &:hover {
    background: #2a2a2a;
  }
`;

const TooltipText = styled.span`
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  width: 200px;
  background: #333;
  color: #e8e8e8;
  font-size: 0.72rem;
  line-height: 1.4;
  padding: 0.5em 0.7em;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 10;
`;

const ScannerRegion = styled.div<{ $visible: boolean }>`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  display: ${(p) => (p.$visible ? 'block' : 'none')};

  & video {
    border-radius: 8px;
  }
`;

const SwitchLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: #ccc;
  flex: 1;
`;

const Switch = styled.button<{ $active: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  background: ${({ $active }) => ($active ? '#646cff' : '#333')};
  transition: background 0.2s;
  padding: 0;
`;

const SwitchThumb = styled.span<{ $active: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $active }) => ($active ? '22px' : '2px')};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.2s;
`;

