import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { onlineManager } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Toaster } from '@/shared/ui/sonner';

import { ThemeProvider } from './app/theme/ThemeProvider';
import { AppInitializer } from './AppInitializer';
import { queryClient } from './shared/api/query-client';
import { PageLoader } from './shared/ui/loader';

import './app/styles/index.css';

onlineManager.setOnline(navigator.onLine);
const persister = createSyncStoragePersister({
  storage: window.localStorage
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PersistQueryClientProvider
        client={queryClient}
        onSuccess={() => {
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries();
          });
        }}
        persistOptions={{ persister }}
      >
        <Suspense fallback={<PageLoader />}>
          <AppInitializer />
          <Toaster />
        </Suspense>
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
