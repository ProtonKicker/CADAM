/**
 * Language Context and Provider for CADAM Internationalization
 * 
 * Provides global language state management and translation functionality.
 * Supports dynamic language switching between English and Chinese (Simplified),
 * with extensibility for additional languages.
 * 
 * Features:
 * - Language detection from browser settings
 * - Persistent language preference in localStorage
 * - Translation function access throughout the app
 * 
 * @author Lingma - AI coding assistant
 * @project CADAM - Open Source Text to CAD Web App
 * @see {@link https://www.i18next.com/} for i18next documentation
 */

import { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lng: string) => Promise<void>;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: i18n.language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
