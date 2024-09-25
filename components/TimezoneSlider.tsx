import { useState } from 'react'
import { motion } from 'framer-motion'

const timezones = Intl.supportedValuesOf('timeZone')

export default function TimezoneSlider({ setSelectedTimezone, isDarkMode }: { setSelectedTimezone: (tz: string) => void, isDarkMode: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}
      >
        Select Timezone
      </button>
      {isOpen && (
        <motion.div 
          className="mt-2 space-y-2 max-h-60 overflow-y-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {timezones.map((tz, index) => (
            <button
              key={index}
              className={`block w-full px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'}`}
              onClick={() => {
                setSelectedTimezone(tz)
                setIsOpen(false)
              }}
            >
              {tz}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}