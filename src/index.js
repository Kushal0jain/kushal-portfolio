import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContentProvider } from './content/ContentContext';

// The admin panel is a separate lazily-loaded chunk, so visitors to the
// portfolio never download it.
const AdminApp = lazy(() => import('./admin/AdminApp'));
const isAdmin = /^\/admin\/?$/.test(window.location.pathname);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : (
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </React.StrictMode>
);
