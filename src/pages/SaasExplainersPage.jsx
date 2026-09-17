import React from 'react';
import Footer from '../components/Footer';
import { PageHeader, VideoProject } from '../components/ui';

const PROJECTS = [
  {
    id: 1,
    client: 'PayPal',
    title: 'Product Walkthrough',
    description: "SaaS explainer breaking down PayPal's core flow — clean, punchy, conversion-focused.",
    tags: ['SaaS', 'Explainer', 'Motion'],
    video: '/paypal.mp4',
  },
];

export default function SaasExplainersPage() {
  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow="Work / SaaS"
            aside={`${String(PROJECTS.length).padStart(2, '0')} Project`}
            title={<>SaaS <em>explainers.</em></>}
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
