// ** MUI Theme Provider
import { deepmerge } from '@mui/utils';
import { ThemeOptions } from '@mui/material';

// ** Theme Override Imports
import palette from './palette';
import shadows from './shadows';
import overrides from './overrides';
import typography from './typography';

const themeOptions = (): ThemeOptions => {
  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const breakpoints = () => ({
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  });

  const userThemeConfig: ThemeOptions = {
    palette:{
      primary: {
        light: '#5195FC',
        main: '#5195FC',
        dark: '#5195FC',
        contrastText: '#FFF'
      }
    },
  };

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: breakpoints(),
      direction: 'ltr',
      components: overrides(),
      palette: palette(),
      spacing: (factor: number) => `${0.25 * factor}rem`,
      shape: {
        borderRadius: 6,
      },
      mixins: {
        toolbar: {
          minHeight: 64,
        },
      },
      shadows: shadows('light'),
      typography,
    },
    userThemeConfig,
  );

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...(mergedThemeConfig.palette
          ? mergedThemeConfig.palette['primary']
          : palette().primary)
      },
    },
  });
};

export default themeOptions;
