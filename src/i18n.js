import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        debug: true,
        fallbackLang: 'en',
        defaultNS: 'common',
        fallbackNS: 'common',
        ns: [
            'login',
            'common',
            'search-books',
            'view-book'
        ],
        interpolation: {
            // Escaping is handled by React:
            escapeValue: false
        },
        react: {
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['strong', 'b']
        }
    });