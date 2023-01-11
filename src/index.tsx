import { ToastMessageProvider } from 'commons/contexts/AlertContext';
import { DiseaseProvider } from 'commons/contexts/DiseaseContext';
import DiseaseService from 'commons/services/DiseaseService';
import { SickResponse } from 'commons/types/response.types';
import CacheControl from 'commons/utils/CacheControl';
import HttpClient from 'commons/utils/HttpClient';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from 'reset.styles';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const cacheControl = new CacheControl<SickResponse[]>(10);
const httpClient = new HttpClient('http://localhost:4000');
const diseaseService = new DiseaseService(cacheControl, httpClient);

root.render(
  <ToastMessageProvider>
    <DiseaseProvider diseaseService={diseaseService}>
      <GlobalStyles />
      <App />
    </DiseaseProvider>
  </ToastMessageProvider>,
);
