import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CortexProvider } from '@azot-dev/cortex';
import { createCore } from './cortex/setup/setup';
import { QRCodeTab } from './components/QRCodeTab';
import { SetupTab } from './components/SetupTab';

type Tab = 'qrcode' | 'setup';

const core = createCore();

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('qrcode');

  return (
    <CortexProvider core={core}>
    <AppContainer>
      <Header>
        <AppTitle>Basic Frite</AppTitle>
      </Header>
      <Tabs>
        <TabButton
          $active={activeTab === 'qrcode'}
          onClick={() => setActiveTab('qrcode')}
        >
          QR Code
        </TabButton>
        <TabButton
          $active={activeTab === 'setup'}
          onClick={() => setActiveTab('setup')}
        >
          Setup
        </TabButton>
      </Tabs>
      <TabContent key={activeTab}>
        {activeTab === 'qrcode' ? <QRCodeTab /> : <SetupTab />}
      </TabContent>
    </AppContainer>
    </CortexProvider>
  );
}

export default App;

const AppContainer = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 0 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 1.5rem 0 1rem;
  text-align: center;
`;

const AppTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Tabs = styled.nav`
  display: flex;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 1.5rem;
  position: relative;
`;

const tabActiveStyle = css`
  background: #2a2a2a;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.6em 1em;
  border: none;
  border-radius: 9px;
  background: transparent;
  color: #777;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.25s ease;

  ${(p) => p.$active && tabActiveStyle}

  &:hover {
    color: ${(p) => (p.$active ? '#fff' : '#bbb')};
  }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const TabContent = styled.div`
  animation: ${slideIn} 0.3s ease;
  flex: 1;
`;
