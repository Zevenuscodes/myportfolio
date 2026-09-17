// Single source of truth for all work. Category pages and the Work grid read from here.

export const CATEGORIES = [
  { key: 'music-videos', label: 'Music Visualisers', path: '/music-videos' },
  { key: 'short-form',   label: 'Short Form',        path: '/short-form',      ratio: '9 / 16' },
  { key: 'saas',         label: 'SaaS',              path: '/saas-explainers' },
];

// Card frame per category — short form is shot 1080×1920, so it gets a vertical frame.
export const DEFAULT_RATIO = '4 / 3';
export const categoryRatio = key => CATEGORIES.find(c => c.key === key)?.ratio || DEFAULT_RATIO;

export const PROJECTS = [
  {
    id: 'musubi',
    category: 'saas',
    client: 'Musubi',
    title: 'Musubi — Episodes to Clips',
    description: 'Product explainer for Musubi — showing how it finds the best moments in a full episode and turns them into clips.',
    tags: ['SaaS', 'Explainer', 'Motion'],
    video: '/musubi-saas.mp4',
  },
  {
    id: 'gor3-hurricane',
    category: 'music-videos',
    title: 'Gor3 — Hurricane',
    tags: ['Music Visualiser'],
    video: '/visualiser.mp4',
  },
  {
    id: 'accidental-design',
    category: 'short-form',
    title: "India's Accidental Design",
    description: 'A short-form dive into the graphic design of Indian matchbox labels — the everyday art nobody set out to make.',
    tags: ['Short Form', 'Documentary'],
    video: '/mbox.mp4',
  },
  {
    id: 'paypal',
    category: 'saas',
    client: 'PayPal',
    title: 'Product Walkthrough',
    description: "SaaS explainer breaking down PayPal's core flow — clean, punchy, conversion-focused.",
    tags: ['SaaS', 'Explainer', 'Motion'],
    video: '/paypal.mp4',
  },
  {
    id: 'mujhe-ye-gaana',
    category: 'music-videos',
    title: 'Mujhe Ye Gaana Pasand Hai',
    tags: ['Music Visualiser'],
    video: '/visualiser2.mp4',
  },
  {
    id: 'satyajit-ray',
    category: 'short-form',
    title: 'Satyajit Ray',
    description: 'A short-form piece on Satyajit Ray — from the advertising agency desk to auteur.',
    tags: ['Short Form', 'Documentary'],
    video: '/ray3.mp4',
  },
  {
    id: 'elon-nikhil',
    category: 'short-form',
    client: 'Elon Musk X Nikhil Kamath',
    title: 'Elon Musk X Nikhil Kamath',
    description: 'A sharp, punchy cut of the Elon Musk and Nikhil Kamath conversation.',
    tags: ['Interview', 'Edit'],
    video: '/video-31.mp4',
  },
  {
    id: 'spiderverse',
    category: 'music-videos',
    title: 'Darzeeeeeee Into the Spiderverse',
    tags: ['Music Visualiser'],
    video: '/video-193.mp4',
  },
  {
    id: 'what-did-i-miss',
    category: 'music-videos',
    client: 'Drake',
    title: 'What Did I Miss',
    description: 'A tight, high-energy cut built around Drake — every frame hits.',
    tags: ['Edit'],
    video: '/video-865.mp4',
  },
];

export const categoryLabel = key => CATEGORIES.find(c => c.key === key)?.label;

export const projectsIn = key => PROJECTS.filter(p => p.category === key);
