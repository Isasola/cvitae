import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const VERSION = '2.1.0';
console.log(`CVitae v${VERSION}`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
