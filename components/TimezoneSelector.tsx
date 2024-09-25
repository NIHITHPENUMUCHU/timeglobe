import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const allTimezones = Intl.supportedValuesOf('timeZone')

export default function TimezoneSelector({ setSelectedTimezone, isDarkMode }: { setSelectedTimezone: (tz: string) => void, isDarkMode: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTimezones, setFilteredTimezones] = useState(allTimezones)

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = allTimezones.filter(timezone => 
      timezone.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredTimezones(filtered)
  }, [searchTerm])

  return (
    <div className="mb-4 relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}
      >
        Select Timezone
      </button>
      {isOpen && (
        <motion.div 
          className={`absolute mt-2 p-2 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <input
            type="text"
            placeholder="Search timezone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 mb-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
          />
          {filteredTimezones.map((tz, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 rounded ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'}`}
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