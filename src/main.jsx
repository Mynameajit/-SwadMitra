import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from "@mui/material";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { initPWAInstall } from "./utils/pwaInstall";
import ThemeModeProvider from './context/ThemeModeProvider .jsx'

// 🔥 Init PWA install banner
initPWAInstall();

// 🔥 Register Service Worker (PRO way)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeModeProvider>
          <CssBaseline />
          <App />
          <Toaster />
        </ThemeModeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
