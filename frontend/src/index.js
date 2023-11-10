import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../src/Membership/locales/en.json';
import cnTranslation from '../src/Membership/locales/cn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      cn: { translation: cnTranslation },
    },
    lng: 'en',  // Default language
    fallbackLng: 'en', // If no translation is found, English is used by default
    interpolation: {
      escapeValue: false,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
