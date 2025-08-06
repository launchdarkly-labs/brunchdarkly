'use client'

import { ReactNode, useEffect, useState } from 'react';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [LDProvider, setLDProvider] = useState<any>(null);

  useEffect(() => {
    const initializeLaunchDarkly = async () => {
      try {
        const Provider = await asyncWithLDProvider({
          clientSideID: process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID || '',
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
        setLDProvider(() => Provider);
      } catch (error) {
        console.error('Failed to initialize LaunchDarkly:', error);
      }
    };

    initializeLaunchDarkly();
  }, []);

  if (!LDProvider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🥞</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BrunchDarkly</h1>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LDProvider>
        {children}
      </LDProvider>
    </QueryClientProvider>
  );
}