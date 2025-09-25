"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { LanguageToggle } from './LanguageToggle'
import { GrillArea } from './GrillArea'
import { CustomerPanel } from './CustomerPanel'
import { ScoreDisplay } from './ScoreDisplay'

export type Language = 'en' | 'ko'

export interface GameState {
  score: number
  level: number
  timeLeft: number
  isPlaying: boolean
  isPaused: boolean
  language: Language
  seaweed: {
    id: string
    state: 'raw' | 'perfect' | 'burnt'
    cookingTime: number
  }[]
  customers: {
    id: string
    type: 'normal' | 'vip'
    order: 'perfect' | 'good' | 'any'
    patience: number
    satisfaction: number
  }[]
}

const translations = {
  en: {
    title: 'Gim Grilling Tycoon',
    start: 'Start Game',
    pause: 'Pause',
    resume: 'Resume',
    score: 'Score',
    level: 'Level',
    time: 'Time',
    gameOver: 'Game Over',
    nextLevel: 'Next Level',
    restart: 'Restart',
    instructions: 'Click on seaweed to flip them. Serve perfect seaweed to customers!',
    perfect: 'Perfect',
    good: 'Good',
    burnt: 'Burnt'
  },
  ko: {
    title: '김 구이 타이쿤',
    start: '게임 시작',
    pause: '일시정지',
    resume: '계속하기',
    score: '점수',
    level: '레벨',
    time: '시간',
    gameOver: '게임 종료',
    nextLevel: '다음 레벨',
    restart: '다시 시작',
    instructions: '김을 클릭해서 뒤집으세요. 완벽한 김을 손님에게 서빙하세요!',
    perfect: '완벽',
    good: '좋음',
    burnt: '탄김'
  }
}

export function GameContainer() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    timeLeft: 60,
    isPlaying: false,
    isPaused: false,
    language: 'en',
    seaweed: [],
    customers: []
  })

  const t = translations[gameState.language]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState.isPlaying && !gameState.isPaused) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1),
          seaweed: prev.seaweed.map(s => ({
            ...s,
            cookingTime: s.cookingTime + 1,
            state: s.cookingTime > 3 ? (s.cookingTime > 6 ? 'burnt' : 'perfect') : 'raw'
          })),
          customers: prev.customers.map(c => ({
            ...c,
            patience: Math.max(0, c.patience - 2),
            satisfaction: Math.max(0, c.satisfaction - 1)
          }))
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState.isPlaying, gameState.isPaused])

  useEffect(() => {
    if (gameState.timeLeft === 0) {
      setGameState(prev => ({ ...prev, isPlaying: false }))
    }
  }, [gameState.timeLeft])

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      score: 0,
      level: 1,
      timeLeft: 60,
      seaweed: Array.from({ length: 3 }, (_, i) => ({
        id: `seaweed-${i}`,
        state: 'raw',
        cookingTime: 0
      })),
      customers: [{
        id: 'customer-1',
        type: 'normal',
        order: 'perfect',
        patience: 100,
        satisfaction: 100
      }]
    }))
  }

  const togglePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }

  const flipSeaweed = (id: string) => {
    setGameState(prev => ({
      ...prev,
      seaweed: prev.seaweed.map(s => 
        s.id === id ? { ...s, cookingTime: 0 } : s
      )
    }))
  }

  const serveCustomer = (customerId: string, seaweedId: string) => {
    const customer = gameState.customers.find(c => c.id === customerId)
    const seaweed = gameState.seaweed.find(s => s.id === seaweedId)
    
    if (customer && seaweed) {
      let points = 0
      if (customer.order === seaweed.state || customer.order === 'any') {
        points = seaweed.state === 'perfect' ? 100 : 50
      } else {
        points = -20
      }

      // Remove served seaweed and customer
      setGameState(prev => {
        const newCustomers = prev.customers.filter(c => c.id !== customerId)
        const newSeaweed = prev.seaweed.filter(s => s.id !== seaweedId)
        
        // Add new seaweed if needed
        const updatedSeaweed = newSeaweed.length < 3 ? [
          ...newSeaweed,
          {
            id: `seaweed-${Date.now()}`,
            state: 'raw' as const,
            cookingTime: 0
          }
        ] : newSeaweed

        // Add new customer
        const updatedCustomers = newCustomers.length < 2 ? [
          ...newCustomers,
          {
            id: `customer-${Date.now()}`,
            type: Math.random() > 0.7 ? 'vip' as const : 'normal' as const,
            order: ['perfect', 'good', 'any'][Math.floor(Math.random() * 3)] as 'perfect' | 'good' | 'any',
            patience: 100,
            satisfaction: 100
          }
        ] : newCustomers

        return {
          ...prev,
          score: prev.score + points,
          seaweed: updatedSeaweed,
          customers: updatedCustomers
        }
      })
    }
  }

  const changeLanguage = (lang: Language) => {
    setGameState(prev => ({ ...prev, language: lang }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {t.title}
          </h1>
          <LanguageToggle 
            language={gameState.language} 
            onChange={changeLanguage}
            translations={translations}
          />
        </div>

        {/* Game Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{t.score}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gameState.score}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{t.level}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gameState.level}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{t.time}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gameState.timeLeft}s</div>
              <Progress value={(gameState.timeLeft / 60) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Controls</CardTitle>
            </CardHeader>
            <CardContent>
              {!gameState.isPlaying ? (
                <Button onClick={startGame} className="w-full">
                  {t.start}
                </Button>
              ) : (
                <Button onClick={togglePause} className="w-full">
                  {gameState.isPaused ? t.resume : t.pause}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        {gameState.isPlaying && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Grill Area */}
            <div className="lg:col-span-2">
              <GrillArea 
                seaweed={gameState.seaweed}
                onFlip={flipSeaweed}
                language={gameState.language}
                translations={translations}
              />
            </div>

            {/* Customer Panel */}
            <div>
              <CustomerPanel 
                customers={gameState.customers}
                seaweed={gameState.seaweed}
                onServe={serveCustomer}
                language={gameState.language}
                translations={translations}
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        {!gameState.isPlaying && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{t.instructions}</p>
              <div className="flex gap-4 mt-4">
                <Badge variant="outline" className="bg-green-100">
                  {t.perfect}: 100 points
                </Badge>
                <Badge variant="outline" className="bg-yellow-100">
                  {t.good}: 50 points
                </Badge>
                <Badge variant="outline" className="bg-red-100">
                  {t.burnt}: -20 points
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Over */}
        {!gameState.isPlaying && gameState.score > 0 && (
          <Card className="mt-6 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-center">{t.gameOver}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl mb-4">Final Score: {gameState.score}</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={startGame} variant="outline">
                  {t.restart}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
