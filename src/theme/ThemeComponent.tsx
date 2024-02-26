// ** React Imports
import { ReactNode } from 'react';

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

// ** Theme
import themeOptions from './ThemeOptions';

// ** Global Styles
import GlobalStyling from './globalStyles';

interface Props {
  children: ReactNode
}

const ThemeComponent = (props: Props) => {
  // ** Props
  const { children } = props;

  // ** Pass merged ThemeOptions (of core and user) to createTheme function
  let theme = createTheme(themeOptions());

  // ** Set responsive font sizes to true
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
