import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App apiToken={import.meta.env.VITE_API_TOKEN} aiConsultationUuid={import.meta.env.VITE_AI_CONSULTATION_UUID} />
  </React.StrictMode>,
);
