import React from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { PageHeader, VideoProject } from '../components/ui';
import { CATEGORIES, PROJECTS, categoryLabel } from '../data/projects';

const FILTERS = [{ key: 'all', label: 'All' }, ...CATEGORIES];

export default function WorkPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('filter');
  const active = FILTERS.some(f => f.key === requested) ? requested : 'all';

  const visible = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);
  const countFor = key => (key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === key).length);

  const select = key => {
    setParams(key === 'all' ? {} : { filter: key }, { replace: true });
  };

  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow="Selected Work"
            aside={`${String(visible.length).padStart(2, '0')} Projects`}
            title={<>The <em>work.</em></>}
          />

          <LayoutGroup>
            <div role="tablist" aria-label="Filter work by category" className="work-filters">
              {FILTERS.map(f => {
                const isActive = f.key === active;
                return (
                  <button
                    key={f.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(f.key)}
                    className="work-filter"
                    style={{ color: isActive ? 'var(--ink)' : 'var(--muted)' }}
                  >
                    {f.label}
                    <sup className="work-filter-count">{String(countFor(f.key)).padStart(2, '0')}</sup>
                    {isActive && (
                      <motion.span
                        layoutId="work-filter-underline"
                        className="work-filter-underline"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <motion.div layout className="video-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <VideoProject
                      project={active === 'all' ? { ...project, kicker: categoryLabel(project.category) } : project}
                      index={i}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
      <Footer />
    </>
  );
}
