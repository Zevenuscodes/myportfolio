import React from 'react';
import Footer from './Footer';
import { PageHeader, VideoProject } from './ui';
import { categoryLabel, projectsIn } from '../data/projects';

export default function CategoryPage({ category, title }) {
  const projects = projectsIn(category);

  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow={`Work / ${categoryLabel(category)}`}
            aside={`${String(projects.length).padStart(2, '0')} Project${projects.length === 1 ? '' : 's'}`}
            title={title}
          />
          <div className="video-grid">
            {projects.map((project, i) => (
              <VideoProject key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
