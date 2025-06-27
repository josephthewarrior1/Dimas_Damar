// src/App.jsx
import { lazy, Suspense } from 'react';
import { HashRouter } from 'react-router-dom'; 
import { HelmetProvider } from 'react-helmet-async';

// Context Providers

import { ThemeProvider } from './theme'; // Custom theme

// Components
import LoadingScreen from './components/LoadingScreen';

// Lazy load main router
const AppRouter = lazy(() => import('./routes'));

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>


      <HashRouter>  
              <Suspense fallback={<LoadingScreen />}>
                <AppRouter />
              </Suspense>
              </HashRouter>  
  
      </ThemeProvider>
    </HelmetProvider>
  );
}