import ReactDOM from 'react-dom/client';

// ** Contexts imports
import Authenticator from './context/Authenticator/Authenticator';

// ** Custom components imports
import ThemeComponent from './theme/ThemeComponent';
import AiTools from './components/AiTools/AiTools';

type Props = {
  username?: string;
  password?: string;
  rememberMe?: boolean;
};

function App({ username, password, rememberMe }: Props) {
  return (
    <ThemeComponent>
      <Authenticator username={username} password={password} rememberMe={rememberMe}>
        <AiTools />
      </Authenticator>
    </ThemeComponent>
  );
}

export function mount(username: string, password: string, rememberMe?: boolean) {
  const widget = document.createElement('div');
  widget.id = 'medassist-widget';
  document.body.appendChild(widget);
  ReactDOM.createRoot(widget).render(<App username={username} password={password} rememberMe={rememberMe} />);
}

export default App;
