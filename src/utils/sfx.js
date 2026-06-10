let ctx = null;
let lastHoverEl = null;

function getCtx() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { return null; }
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function beep({ freq = 660, endFreq = 880, duration = 0.07, vol = 0.055, type = 'square' } = {}) {
  const c = getCtx();
  if (!c) return;
  try {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, c.currentTime + duration);
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration + 0.01);
  } catch (e) {}
}

// Walk up to 6 ancestors to find the nearest element with cursor:pointer
function getInteractiveAncestor(el) {
  let node = el;
  for (let i = 0; i < 6; i++) {
    if (!node || node === document.body) return null;
    if (window.getComputedStyle(node).cursor === 'pointer') return node;
    node = node.parentElement;
  }
  return null;
}

export function initSFX() {
  if (typeof window === 'undefined') return;

  // Hover blip — ascending chirp
  document.addEventListener('mouseover', (e) => {
    const interactive = getInteractiveAncestor(e.target);
    if (interactive === lastHoverEl) return;
    lastHoverEl = interactive;
    if (interactive) {
      beep({ freq: 480, endFreq: 760, duration: 0.065, vol: 0.045, type: 'square' });
    }
  });

  // Click thunk — descending
  document.addEventListener('mousedown', (e) => {
    if (getInteractiveAncestor(e.target)) {
      beep({ freq: 820, endFreq: 280, duration: 0.09, vol: 0.065, type: 'square' });
    }
  });
}
