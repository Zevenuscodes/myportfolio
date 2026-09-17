import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import { TransitionProvider } from './components/DoorTransition';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import SaasExplainersPage from './pages/SaasExplainersPage';
import MusicVideosPage from './pages/MusicVideosPage';
import ShortFormPage from './pages/ShortFormPage';
import LongformPage from './pages/LongformPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
          <Cursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/saas-explainers" element={<SaasExplainersPage />} />
            <Route path="/music-videos" element={<MusicVideosPage />} />
            <Route path="/short-form" element={<ShortFormPage />} />
            <Route path="/visualisers" element={<Navigate to="/music-videos" replace />} />
            <Route path="/motion-designs" element={<Navigate to="/short-form" replace />} />
            <Route path="/longform" element={<LongformPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
}
