"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ScoreDisplayProps {
  score: number
  level: number
  timeLeft: number
  language: 'en' | 'ko'
  translations: any
}

export function ScoreDisplay({ score, level, timeLeft, language, translations }: ScoreDisplayProps) {
  const t = translations[language]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t.score}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <Badge variant="outline" className="mt-1">
            {score > 500 ? (language === 'en' ? 'Excellent!' : '훌륭해요!') :
             score > 300 ? (language === 'en' ? 'Good!' : '좋아요!') :
             score > 100 ? (language === 'en' ? 'Not bad' : '나쁘지 않아요') :
             (language === 'en' ? 'Keep trying!' : '계속 도전하세요!')}
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t.level}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{level}</div>
          <Badge variant="outline" className="mt-1">
            {language === 'en' ? 'Current Level' : '현재 레벨'}
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{t.time}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-600' : 'text-orange-600'}`}>
            {timeLeft}s
          </div>
          <Badge variant="outline" className="mt-1">
            {timeLeft < 10 ? 
              (language === 'en' ? 'Hurry!' : '서둘러요!') :
              (language === 'en' ? 'Time left' : '남은 시간')
            }
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
