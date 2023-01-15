import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { theme } from '../config/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />{' '}
    </ThemeProvider>
  );
}
