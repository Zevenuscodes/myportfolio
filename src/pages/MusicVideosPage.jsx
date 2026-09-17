import React from 'react';
import Footer from '../components/Footer';
import { PageHeader, VideoProject } from '../components/ui';

const PROJECTS = [
  {
    id: 1,
    title: 'Gor3 — Hurricane',
    tags: ['Music Visualiser'],
    video: '/visualiser.mp4',
  },
  {
    id: 2,
    title: 'Mujhe Ye Gaana Pasand Hai',
    tags: ['Music Visualiser'],
    video: '/visualiser2.mp4',
  },
  {
    id: 3,
    title: 'Darzeeeeeee Into the Spiderverse',
    tags: ['Music Visualiser'],
    video: '/video-193.mp4',
  },
];

export default function MusicVideosPage() {
  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow="Work / Music Videos"
            aside={`${String(PROJECTS.length).padStart(2, '0')} Projects`}
            title={<>Music <em>videos.</em></>}
          />
          <div className="video-grid">
            {PROJECTS.map((project, i) => (
              <VideoProject key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
