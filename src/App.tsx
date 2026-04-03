import { AuthProvider } from '@/contexts/AuthProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { MeshFilesProvider } from '@/contexts/MeshFilesContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <MeshFilesProvider>
            <TooltipProvider delayDuration={0}>
              <Toaster />
              <Outlet />
            </TooltipProvider>
          </MeshFilesProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
