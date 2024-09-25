'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TimezoneSelector from './TimezoneSelector'
import EasterEggChallenge from './EasterEggChallenge'
import { Sun, Moon, Clock } from 'lucide-react'

export default function TimeGlobe() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [easterEggsFound, setEasterEggsFound] = useState<string[]>([])
  const [referralCode, setReferralCode] = useState('')
  const [showChallenge, setShowChallenge] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    if (!mounted) return ''
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: selectedTimezone,
    })
  }

  const handleEasterEggFound = (eggId: string) => {
    if (!easterEggsFound.includes(eggId)) {
      const newEasterEggs = [...easterEggsFound, eggId]
      setEasterEggsFound(newEasterEggs)
      const newReferralCode = generateReferralCode(newEasterEggs)
      setReferralCode(newReferralCode)
      alert(`Congratulations! You've found an easter egg!\nYour new referral code is: ${newReferralCode}\nMake sure to save this code to track your progress!`)
    }
  }

  const generateReferralCode = (eggs: string[]) => {
    return btoa(JSON.stringify(eggs))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-4 right-4 flex space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setShowChallenge(!showChallenge)} className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500">
            <Clock size={24} />
          </button>
        </div>
        <h1 className="text-6xl font-bold mb-4 text-shadow relative">
          TimeGlobe
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 mix-blend-overlay"></div>
        </h1>
        <div className="text-8xl font-mono mb-8 relative">
          {formatTime(time)}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-50 mix-blend-overlay"></div>
        </div>
        <TimezoneSelector setSelectedTimezone={setSelectedTimezone} isDarkMode={isDarkMode} />
        {showChallenge && (
          <EasterEggChallenge 
            easterEggsFound={easterEggsFound} 
            onEasterEggFound={handleEasterEggFound}
            referralCode={referralCode}
            isDarkMode={isDarkMode}
          />
        )}
      </motion.div>
    </div>
  )
}