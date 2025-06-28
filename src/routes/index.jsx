import { useRoutes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import IntroLayout from '../layouts/IntroLayout';
import HomePage from '../pages/Home';
import invitationData from '../data/invitationData';
import IntroScreen from '../components/IntroScreen';
import AudioPlayer from '../components/AudioPlayer';

export default function AppRouter() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Ubah default menjadi false

  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/intro" />,
    },
    {
      path: '/intro',
      element: <IntroLayout />,
      children: [
        {
          path: '',
          element: <IntroScreen 
            {...invitationData} 
            onOpenInvitation={() => setIsAudioPlaying(true)} // Tambahkan prop ini
          />,
        },
      ],
    },
    {
      path: '/home',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
   
  ]);

  return (
    <>
      <AudioPlayer audioUrl={invitationData.audioUrl} isPlaying={isAudioPlaying} />
      {routes}
    </>
  );
}