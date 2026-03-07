import styled from 'styled-components';
import { useService } from '../cortex/setup/setup';
import { QRScanner } from './QRScanner';

type SetupTabProps = {
  onBack: () => void;
};

export function SetupTab({ onBack }: SetupTabProps) {
  const { cardNumber, deviceId, guid, setDeviceId, setGuid } = useService('form');

  return (
    <PageWrapper>
      <BackButton type="button" onClick={onBack} aria-label="Retour">
        ✕
      </BackButton>
      <Container>
        <SectionTitle>Scanner un QR code</SectionTitle>
      <QRScanner />

      <SectionTitle>Informations actuelles</SectionTitle>
      <InfoCard>
        <InfoRow>
          <InfoLabel>Carte</InfoLabel>
          <InfoValue>{cardNumber}</InfoValue>
        </InfoRow>
        <Divider />
        <InfoRow>
          <InfoLabel>Device ID</InfoLabel>
          <InfoValue>{deviceId}</InfoValue>
        </InfoRow>
        <Divider />
        <InfoRow>
          <InfoLabel>GUID</InfoLabel>
          <InfoValue>{guid}</InfoValue>
        </InfoRow>
      </InfoCard>

      <SectionTitle>Modifier</SectionTitle>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label htmlFor="guid">GUID</Label>
          <Input
            id="guid"
            type="text"
            placeholder="Ex: NJJ, 2L8..."
            value={guid}
            onChange={(e) => setGuid(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="deviceId">Device ID</Label>
          <Input
            id="deviceId"
            type="text"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
        </FormGroup>
      </Form>
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

const InfoValue = styled.span`
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #ccc;
  text-align: right;
  word-break: break-all;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Input = styled.input`
  padding: 0.7em 0.85em;
  border-radius: 10px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #e8e8e8;
  font-size: 0.95rem;
  font-family: 'SF Mono', 'Fira Code', monospace;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #646cff;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.15);
  }
`;
