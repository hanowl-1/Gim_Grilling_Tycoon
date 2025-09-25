"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Language } from './GameContainer'

interface Customer {
  id: string
  type: 'normal' | 'vip'
  order: 'perfect' | 'good' | 'any'
  patience: number
  satisfaction: number
}

interface CustomerPanelProps {
  customers: Customer[]
  seaweed: { id: string; state: 'raw' | 'perfect' | 'burnt'; cookingTime: number }[]
  onServe: (customerId: string, seaweedId: string) => void
  language: Language
  translations: any
}

export function CustomerPanel({ customers, seaweed, onServe, language, translations }: CustomerPanelProps) {
  const getCustomerImage = (type: string) => {
    switch (type) {
      case 'vip':
        return '/assets/customer-vip.jpg'
      default:
        return '/assets/customer-1.jpg'
    }
  }

  const getOrderText = (order: string) => {
    switch (order) {
      case 'perfect':
        return language === 'en' ? 'Perfect Gim' : '완벽한 김'
      case 'good':
        return language === 'en' ? 'Good Gim' : '좋은 김'
      case 'any':
        return language === 'en' ? 'Any Gim' : '아무 김'
      default:
        return order
    }
  }

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case 'vip':
        return 'bg-purple-100 border-purple-400 text-purple-800'
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? 'Customers' : '손님들'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {customers.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {language === 'en' ? 'No customers waiting' : '대기 중인 손님이 없습니다'}
          </div>
        ) : (
          customers.map((customer) => (
            <div key={customer.id} className={`p-4 rounded-lg border-2 ${getCustomerTypeColor(customer.type)}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  {customer.type === 'vip' ? <span className="text-white text-xl">👑</span> : <span className="text-white text-xl">😊</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {customer.type.toUpperCase()}
                    </Badge>
                    <span className="font-semibold">
                      {getOrderText(customer.order)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{language === 'en' ? 'Patience' : '인내심'}</span>
                    <span>{customer.patience}%</span>
                  </div>
                  <Progress value={customer.patience} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{language === 'en' ? 'Satisfaction' : '만족도'}</span>
                    <span>{customer.satisfaction}%</span>
                  </div>
                  <Progress value={customer.satisfaction} className="h-2" />
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="text-xs font-semibold">
                  {language === 'en' ? 'Select Seaweed to Serve:' : '서빙할 김을 선택하세요:'}
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {seaweed.map((s) => (
                    <Button
                      key={s.id}
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => onServe(customer.id, s.id)}
                    >
                      {s.state === 'raw' && '🌿'}
                      {s.state === 'perfect' && '🍃'}
                      {s.state === 'burnt' && '🔥'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Customer Queue Info */}
        <div className="text-center text-sm text-gray-600 mt-4">
          {language === 'en' 
            ? 'More customers will arrive as you serve them!' 
            : '손님을 서빙하면 더 많은 손님이 올 것입니다!'
          }
        </div>
      </CardContent>
    </Card>
  )
}
