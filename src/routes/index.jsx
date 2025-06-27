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
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

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
          element: <IntroScreen {...invitationData} />,
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
    {
      element: <MainLayout />,
      children: [
        { path: '/gallery', lazy: () => import('../pages/Gallery') },
        { path: '/rsvp', lazy: () => import('../pages/RSVP') },
      ],
    },
  ]);

  return (
    <>
      <AudioPlayer audioUrl={invitationData.audioUrl} isPlaying={isAudioPlaying} />
      {routes}
    </>
  );
}
