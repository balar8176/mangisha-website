import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import './styles/global.css';
import App from './App';
import { SmoothScrollProvider } from './lib/smoothScroll';
import { ShortlistProvider } from './hooks/useShortlist';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScrollProvider>
        <ShortlistProvider>
          <App />
        </ShortlistProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
