import { useMemo } from 'react';
import { Tutorial } from './Tutorial';
import { TutorialEditor } from './TutorialEditor';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import steps from './steps.json';

function App({ page, isEditMode }: { page?: number, isEditMode: boolean }) {
  const initialStep = page === undefined ? undefined : page > 0 && page <= steps.length ? page - 1 : 0;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        isEditMode
          ? <TutorialEditor theme={mode} />
          : <Tutorial theme={mode} steps={steps} initialStep={initialStep} />
      }
    </ThemeProvider>

  );
}

export default App;