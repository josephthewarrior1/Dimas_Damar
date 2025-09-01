import { useRoutes, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import WeddingPage from '../pages/WeddingPage';
import invitationData from '../data/invitationData';
import AudioPlayer from '../components/AudioPlayer';

// Buat context untuk audio
export const AudioContext = createContext();

export default function AppRouter() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" replace />,
    },
    {
      path: '/home',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: '/wedding',
      element: (
        <MainLayout>
          <WeddingPage />
        </MainLayout>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/home" replace />,
    }
  ]);

  return (
    <AudioContext.Provider value={{ isAudioPlaying, setIsAudioPlaying }}>
      <AudioPlayer 
        audioUrl={invitationData.audioUrl} 
        isPlaying={isAudioPlaying} 
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />
      {routes}
    </AudioContext.Provider>
  );
}