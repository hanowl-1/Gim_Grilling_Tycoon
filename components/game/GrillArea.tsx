"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Language } from './GameContainer'

interface Seaweed {
  id: string
  state: 'raw' | 'perfect' | 'burnt'
  cookingTime: number
}

interface GrillAreaProps {
  seaweed: Seaweed[]
  onFlip: (id: string) => void
  language: Language
  translations: any
}

export function GrillArea({ seaweed, onFlip, language, translations }: GrillAreaProps) {
  const getSeaweedImage = (state: string) => {
    switch (state) {
      case 'raw':
        return '/assets/seaweed-raw.jpg'
      case 'perfect':
        return '/assets/seaweed-perfect.jpg'
      case 'burnt':
        return '/assets/seaweed-burnt.jpg'
      default:
        return '/assets/seaweed-raw.jpg'
    }
  }

  const getSeaweedColor = (state: string) => {
    switch (state) {
      case 'raw':
        return 'bg-green-200 border-green-400'
      case 'perfect':
        return 'bg-yellow-200 border-yellow-400'
      case 'burnt':
        return 'bg-red-200 border-red-400'
      default:
        return 'bg-gray-200 border-gray-400'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? 'Grill Station' : '그릴 스테이션'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Character Image */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-4xl">👩‍🍳</span>
            </div>
            <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white">
              {language === 'en' ? 'Chef' : '요리사'}
            </Badge>
          </div>
        </div>

        {/* Grill Surface */}
        <div className="bg-gray-800 rounded-lg p-6 border-4 border-gray-600">
          <div className="grid grid-cols-3 gap-4">
            {seaweed.map((item) => (
              <div key={item.id} className="text-center">
                <Button
                  onClick={() => onFlip(item.id)}
                  className={`w-full h-20 p-2 ${getSeaweedColor(item.state)} hover:scale-105 transition-transform`}
                  variant="outline"
                >
                  <div className="w-full h-full rounded flex items-center justify-center">
                    {item.state === 'raw' && <span className="text-4xl">🌿</span>}
                    {item.state === 'perfect' && <span className="text-4xl">🍃</span>}
                    {item.state === 'burnt' && <span className="text-4xl">🔥</span>}
                  </div>
                </Button>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {translations[language][item.state]}
                  </Badge>
                  <div className="text-xs text-gray-600 mt-1">
                    {item.cookingTime}s
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {language === 'en' 
            ? 'Click seaweed to flip them. Watch the cooking time!' 
            : '김을 클릭해서 뒤집으세요. 조리 시간을 확인하세요!'
          }
        </div>
      </CardContent>
    </Card>
  )
}
