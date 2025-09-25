"use client"

import { Button } from '@/components/ui/button'
import { Language } from './GameContainer'

interface LanguageToggleProps {
  language: Language
  onChange: (lang: Language) => void
  translations: any
}

export function LanguageToggle({ language, onChange, translations }: LanguageToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('en')}
        className="text-white"
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={language === 'ko' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('ko')}
        className="text-white"
      >
        🇰🇷 KO
      </Button>
    </div>
  )
}
