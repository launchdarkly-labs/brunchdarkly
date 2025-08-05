import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <LDProvider>
          <App />
        </LDProvider>
      </QueryClientProvider>
    </StrictMode>
  );
})();