import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CortexProvider } from '@azot-dev/cortex';
import { createCore } from './cortex/setup/setup';
import { QRCodeTab } from './components/QRCodeTab';
import { SetupTab } from './components/SetupTab';

const core = createCore();

function App() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <CortexProvider core={core}>
      <AppWrapper>
        {showSetup ? (
          <SetupTab onBack={() => setShowSetup(false)} />
        ) : (
          <QRCodeTab onOpenSetup={() => setShowSetup(true)} />
        )}
      </AppWrapper>
    </CortexProvider>
  );
}

export default App;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100%;
  animation: ${slideIn} 0.3s ease;
`;
