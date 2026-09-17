import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { PageHeader, fadeUp } from './ui';

export default function ComingSoon({ eyebrow, title, note }) {
  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader eyebrow={eyebrow} aside="In the edit" title={title} />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '40ch' }}
          >
            {note}
          </motion.p>
        </div>
      </section>
      <Footer />
    </>
  );
}
