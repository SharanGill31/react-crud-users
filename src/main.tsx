
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './index.css';
import App from './App.tsx';
import MainLayout from './layouts/MainLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <App />
      </MainLayout>
    </ThemeProvider>
  </StrictMode>,
);
