"use client"

import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    // Redirect to the game
    window.location.href = "/index.html"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Kim Grilling Tycoon</h1>
        <p className="text-xl mb-8">Loading game...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-sm">
          If the game doesn't load automatically,{" "}
          <a href="/index.html" className="underline">
            click here
          </a>
        </p>
      </div>
    </div>
  )
}
