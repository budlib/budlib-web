import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/datatables/dataTables.bootstrap4.min.css';
import './assets/fontawesome-free/css/all.min.css';
import './assets/sb-admin/custom.css';
import './assets/sb-admin/theme.css';
import './assets/sb-admin/theme.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
