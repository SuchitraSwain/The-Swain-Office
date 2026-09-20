import { continueRender, delayRender } from 'remotion';

// Load JetBrains Mono via a plain stylesheet link (matches the landing page).
// We avoid @remotion/google-fonts because its esbuild web-fonts plugin crashes
// on Node 22 during bundling.
const FAMILY = 'JetBrains Mono';

if (typeof document !== 'undefined' && !document.getElementById('jb-mono-font')) {
  const handle = delayRender('Loading JetBrains Mono');
  const link = document.createElement('link');
  link.id = 'jb-mono-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
  const done = () => continueRender(handle);
  const timer = setTimeout(done, 4000);
  link.onload = () => {
    const ready = (document as any).fonts?.ready as Promise<unknown> | undefined;
    if (ready) ready.then(() => { clearTimeout(timer); done(); });
    else { clearTimeout(timer); done(); }
  };
  link.onerror = () => { clearTimeout(timer); done(); };
  document.head.appendChild(link);
}

export const press = FAMILY;
export const vt = FAMILY;
export const pixelify = FAMILY;
export const jb = FAMILY;
