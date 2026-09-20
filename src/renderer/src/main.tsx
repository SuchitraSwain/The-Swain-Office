import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import brandLogo from '@brand/logo.png?url';
import './design/global.css';
import './i18n';

const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = brandLogo;
document.head.appendChild(favicon);

const splashMark = document.querySelector('#cth-splash .mk');
if (splashMark) {
  const img = document.createElement('img');
  img.src = brandLogo;
  img.alt = 'The Swain Office';
  img.style.cssText = 'height:56px;width:auto;display:block';
  splashMark.replaceWith(img);
}

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

// The Vite URL is the Electron renderer host, not a website. Opening it in
// Chrome/Cursor has no preload bridge (`window.cth`), and mounting App then
// crashes on the first hiveRegistry call — leaving a blank page. Keep the
// splash and say so; the real UI is the desktop window.
if (typeof window.cth?.hiveRegistry !== 'function') {
  const hint = document.querySelector('#cth-splash .hint');
  if (hint) hint.textContent = 'This tab is only the Vite server. Use the Swain Office desktop window.';
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
