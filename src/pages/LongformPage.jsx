import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function LongformPage() {
  return (
    <ComingSoon
      eyebrow="Work / Documentaries"
      title={<>Coming <em>soon.</em></>}
      note="Long-form documentary work is on its way."
    />
  );
}
