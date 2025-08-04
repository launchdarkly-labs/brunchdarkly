import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || '',
    context: {
      kind: 'user',
      key: uuidv4(),
      name: 'Demo User',
      email: 'demo@brunchdarkly.com',
    },
    options: {
      bootstrap: 'localStorage',
    }
  });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </StrictMode>
  );
})();