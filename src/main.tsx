import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App
      practitionerUuid={import.meta.env.VITE_PRACTITIONER_UUID}
      patientUuid={import.meta.env.VITE_PATIENT_UUID}
      caseContextUuid={import.meta.env.VITE_CASE_CONTEXT_UUID}
      platformUuid={import.meta.env.VITE_PLATFORM_UUID}
      providerUuid={import.meta.env.VITE_PROVIDER_UUID}
      apiToken={import.meta.env.VITE_API_TOKEN}
    />
  </React.StrictMode>,
);
