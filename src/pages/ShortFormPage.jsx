import React from 'react';
import Footer from '../components/Footer';
import { PageHeader, VideoProject } from '../components/ui';

const PROJECTS = [
  {
    id: 1,
    client: 'Truck Art',
    title: 'Truck Art Adda',
    description: 'A vibrant dive into the subculture of Indian truck art — bold, colourful, unapologetically loud.',
    tags: ['Short Form', 'Documentary'],
    video: '/truckartsample.mp4',
  },
  {
    id: 2,
    client: 'Elon Musk X Nikhil Kamath',
    title: 'Elon Musk X Nikhil Kamath',
    description: 'A sharp, punchy cut of the Elon Musk and Nikhil Kamath conversation.',
    tags: ['Interview', 'Edit'],
    video: '/video-31.mp4',
  },
  {
    id: 3,
    client: 'Drake',
    title: 'What Did I Miss',
    description: 'A tight, high-energy cut built around Drake — every frame hits.',
    tags: ['Edit'],
    video: '/video-865.mp4',
  },
];

export default function ShortFormPage() {
  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow="Work / Short Form"
            aside={`${String(PROJECTS.length).padStart(2, '0')} Projects`}
            title={<>Short <em>form.</em></>}
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
