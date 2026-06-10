import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initSFX } from './utils/sfx';
import Navbar from './components/Navbar';
import CyberpunkCursor from './components/CyberpunkCursor';
import { TransitionProvider } from './components/DoorTransition';
import HomePage from './pages/HomePage';
import VisualisersPage from './pages/VisualisersPage';
import WorkPage from './pages/WorkPage';
import SaasExplainersPage from './pages/SaasExplainersPage';
import MusicVideosPage from './pages/MusicVideosPage';
import MotionDesignsPage from './pages/MotionDesignsPage';
import LongformPage from './pages/LongformPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  useEffect(() => { initSFX(); }, []);

  return (
    <BrowserRouter>
      <TransitionProvider>
        <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
          <CyberpunkCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/visualisers" element={<VisualisersPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/saas-explainers" element={<SaasExplainersPage />} />
            <Route path="/music-videos" element={<MusicVideosPage />} />
            <Route path="/motion-designs" element={<MotionDesignsPage />} />
            <Route path="/longform" element={<LongformPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
}
