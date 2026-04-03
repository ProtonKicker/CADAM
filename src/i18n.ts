/**
 * Internationalization (i18n) Configuration for CADAM
 * 
 * This module sets up the i18next framework for multi-language support in CADAM.
 * It provides automatic language detection and supports English and Chinese (Simplified).
 * 
 * Features:
 * - Browser language detection
 * - LocalStorage persistence of language preference
 * - React integration via react-i18next
 * - Interpolation support for dynamic content
 * 
 * Usage:
 * ```typescript
 * import { useTranslation } from 'react-i18next';
 * const { t } = useTranslation();
 * // Use in JSX: {t('key.path')}
 * ```
 * 
 * @author Lingma - AI coding assistant
 * @project CADAM - Open Source Text to CAD Web App
 * @see {@link https://www.i18next.com/} for i18next documentation
 * @see {@link https://react.i18next.com/} for React integration
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import zhCNCommon from './locales/zh-CN/common.json';

const resources = {
  en: {
    translation: enCommon,
  },
  'zh-CN': {
    translation: zhCNCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
