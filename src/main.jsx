import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

/* ── Remove splash loader once React has mounted ── */
const loader = document.getElementById('tz-splash');
if (loader) {
  loader.style.transition = 'opacity 0.6s ease';
  loader.style.opacity = '0';
  setTimeout(() => loader?.remove(), 650);
}
