/**
 * Language Selector Component for CADAM
 * 
 * Provides language switching functionality for internationalization support.
 * Part of the i18n implementation for multi-language UI support.
 * 
 * @author Lingma - AI coding assistant
 * @project CADAM - Open Source Text to CAD Web App
 */

import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
];

export function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="dark" className="gap-2 rounded-full font-light">
          <Globe className="h-4 w-4" />
          <span>{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
            {lang.code === currentLanguage && ' ✓'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
