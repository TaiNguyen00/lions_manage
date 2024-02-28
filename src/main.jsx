import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { AppProvider, AuthProvider } from './context';
import Loading from './components/Loading/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Loading />
      <App />
    </AppProvider>
  </React.StrictMode>
);
