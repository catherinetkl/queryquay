import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';

import './index.css';
import App from './App';

async function initializeApp() {
    try {
        await i18n
            .use(HttpApi)
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                supportedLngs: ['en', 'zh', 'ms', 'fr', 'th'],
                defaultNS: 'translation',
                fallbackLng: 'en',
                debug: false,
                detection: {
                    order: ['path', 'cookie', 'htmlTag'],
                    caches: ['cookie'],
                },
                interpolation: {
                    escapeValue: false,
                },
                backend: {
                    loadPath: '/locales/{{lng}}/translation.json',
                },
            });

        const root = ReactDOM.createRoot(
            document.getElementById('root') as HTMLElement
        );

        root.render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
        );
    } catch (error) {
        console.error('Error initializing i18next:', error);
    }
}

initializeApp();

