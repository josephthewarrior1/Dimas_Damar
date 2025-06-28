import { lazy, Suspense } from 'react';
import { BrowserRouter } from "react-router-dom"; 
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './theme';
import LoadingScreen from './components/LoadingScreen';

const AppRouter = lazy(() => import('./routes'));

export default function App() {
  // Automatically detect environment
  const isProduction = import.meta.env.PROD;
  const basename = isProduction ? '/wedding_invitation' : '/';

  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter basename={basename}>
          <Suspense fallback={<LoadingScreen />}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}