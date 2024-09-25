import { useState, useEffect } from 'react'

const generateEasterEggs = (date: Date) => {
  const seed = date.getTime()
  const easterEggs = []
  for (let i = 0; i < 10; i++) {
    easterEggs.push({
      id: `egg${seed + i}`,
      hint: `Easter egg hint ${i + 1} for ${date.toDateString()}`
    })
  }
  return easterEggs
}

export default function EasterEggChallenge({ 
  easterEggsFound, 
  onEasterEggFound,
  referralCode,
  isDarkMode
}: { 
  easterEggsFound: string[], 
  onEasterEggFound: (eggId: string) => void,
  referralCode: string,
  isDarkMode: boolean
}) {
  const [showHints, setShowHints] = useState(false)
  const [inputCode, setInputCode] = useState('')
  const [currentEasterEggs, setCurrentEasterEggs] = useState(generateEasterEggs(new Date()))

  useEffect(() => {
    const refreshEasterEggs = () => {
      setCurrentEasterEggs(generateEasterEggs(new Date()))
    }

    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    const msUntilMidnight = midnight.getTime() - new Date().getTime()

    const timer = setTimeout(refreshEasterEggs, msUntilMidnight)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmitCode = () => {
    try {
      const decodedEggs = JSON.parse(atob(inputCode))
      if (Array.isArray(decodedEggs)) {
        decodedEggs.forEach(egg => onEasterEggFound(egg))
      }
    } catch (error) {
      alert('Invalid referral code')
    }
    setInputCode('')
  }

  return (
    <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <h2 className="text-2xl font-bold mb-4">Easter Egg Challenge</h2>
      <button 
        onClick={() => setShowHints(!showHints)}
        className={`px-4 py-2 rounded mb-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}
      >
        {showHints ? 'Hide Hints' : 'Show Hints'}
      </button>
      {showHints && (
        <ul className="mb-4">
          {currentEasterEggs.map(egg => (
            <li key={egg.id} className={easterEggsFound.includes(egg.id) ? 'line-through' : ''}>
              {egg.hint}
            </li>
          ))}
        </ul>
      )}
      <div className="mb-4">
        <input 
          type="text" 
          value={inputCode} 
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter referral code"
          className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}
        />
        <button 
          onClick={handleSubmitCode}
          className={`px-4 py-2 rounded ml-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}
        >
          Submit Code
        </button>
      </div>
      <p>Easter Eggs Found: {easterEggsFound.length} / {currentEasterEggs.length}</p>
      {easterEggsFound.length === currentEasterEggs.length && (
        <p className="text-green-500 font-bold mt-4">
          Congratulations! You've found all the easter eggs for today!
        </p>
      )}
      {referralCode && (
        <p className="mt-4">
          Your referral code: {referralCode}
        </p>
      )}
    </div>
  )
}