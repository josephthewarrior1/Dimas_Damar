import { useRoutes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import WeddingPage from '../pages/WeddingPage';
import invitationData from '../data/invitationData';
import AudioPlayer from '../components/AudioPlayer';

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
          <HomePage 
            onOpenInvitation={() => setIsAudioPlaying(true)}
          />
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
    <>
      <AudioPlayer audioUrl={invitationData.audioUrl} isPlaying={isAudioPlaying} />
      {routes}
    </>
  );
}