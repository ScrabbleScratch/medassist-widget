import ReactDOM from 'react-dom/client';

// ** Contexts imports
import Authenticator from './context/Authenticator';

// ** Custom components imports
import ThemeComponent from './theme/ThemeComponent';
import AiTools from './components/AiTools/AiTools';

type Props = {
  apiToken: string;
  aiConsultationUuid: string;
};

function App({ apiToken, aiConsultationUuid }: Props) {
  return (
    <ThemeComponent>
      <Authenticator apiToken={apiToken} aiConsultationUuid={aiConsultationUuid}>
        <AiTools />
      </Authenticator>
    </ThemeComponent>
  );
}

export function mount(apiToken: string, aiConsultationUuid: string) {
  const widget = document.createElement('div');
  widget.id = 'medassist-widget';
  document.body.appendChild(widget);
  ReactDOM.createRoot(widget).render(<App apiToken={apiToken} aiConsultationUuid={aiConsultationUuid} />);
}

export default App;
