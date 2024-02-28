import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App apiToken={import.meta.env.VITE_API_TOKEN} aiConsultationUuid='7d049feb-4ec3-469f-96b2-b24604559b05' />
  </React.StrictMode>,
);
