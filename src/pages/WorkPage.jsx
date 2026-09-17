import React from 'react';
import Footer from '../components/Footer';
import { usePageTransition } from '../components/DoorTransition';
import { IndexRow, PageHeader } from '../components/ui';

const CATEGORIES = [
  { label: 'Music Videos', note: 'Visualisers & music edits', path: '/music-videos' },
  { label: 'Short Form',   note: 'Reels, cuts & edits',       path: '/short-form' },
  { label: 'SaaS',         note: 'Product explainers',        path: '/saas-explainers' },
];

export default function WorkPage() {
  const { transitionTo } = usePageTransition();

  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow="Selected Work"
            aside={`${String(CATEGORIES.length).padStart(2, '0')} Categories`}
            title={<>The <em>work.</em></>}
          />
          {CATEGORIES.map((item, i) => (
            <IndexRow key={item.path} item={item} index={i} onClick={() => transitionTo(item.path)} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
