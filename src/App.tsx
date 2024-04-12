import ReactDOM from 'react-dom/client';

// ** Contexts imports
import Authenticator from './context/Authenticator';
import DataController from './context/DataController';

// ** Custom components imports
import ThemeComponent from './theme/ThemeComponent';
import AiTools from './components/AiTools/AiTools';

type Props = {
  practitionerUuid: string;
  patientUuid: string;
  platformUuid: string;
  providerUuid: string;
  apiToken: string;
  caseContextUuid?: string | null;
};

function App({ practitionerUuid, patientUuid, platformUuid, providerUuid, apiToken, caseContextUuid }: Props) {
  return (
    <ThemeComponent>
      <Authenticator apiToken={apiToken}>
        <DataController
          practitionerUuid={practitionerUuid}
          patientUuid={patientUuid}
          platformUuid={platformUuid}
          providerUuid={providerUuid}
          caseContextUuid={caseContextUuid}
        >
          <AiTools />
        </DataController>
      </Authenticator>
    </ThemeComponent>
  );
}

export function mount(
  practitionerUuid: string,
  patientUuid: string,
  caseContextUuid: string | null,
  platformUuid: string,
  providerUuid: string,
  apiToken: string
) {
  if (document.getElementById('medassist-widget')) {
    console.error('Mounting multiple instances of the widget is not allowed.');
    return;
  }
  const widget = document.createElement('div');
  widget.id = 'medassist-widget';
  document.body.appendChild(widget);
  ReactDOM.createRoot(widget).render(
    <App
      practitionerUuid={practitionerUuid}
      patientUuid={patientUuid}
      platformUuid={platformUuid}
      providerUuid={providerUuid}
      apiToken={apiToken}
      caseContextUuid={caseContextUuid}
    />
  );
}

export function unmount() {
  const widget = document.getElementById('medassist-widget');
  if (widget) widget.remove();
}

export default App;
