import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';


axios.defaults.baseURL="http://localhost:5000/api/v1";
axios.defaults.withCredentials=true;

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Slab', serif",  // Correctly specify the font family
    allVariants: {
      color: 'white',  // Apply white text color to all text variants
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <ThemeProvider theme={theme}>
        <Toaster position='top-right'/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
