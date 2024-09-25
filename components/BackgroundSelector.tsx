import { useState } from 'react'
import { motion } from 'framer-motion'

const backgrounds = [
  'bg-black',
  'bg-gradient-to-r from-purple-500 to-pink-500',
  'bg-gradient-to-r from-cyan-500 to-blue-500',
  'bg-gradient-to-r from-emerald-500 to-lime-600',
  'bg-gradient-to-r from-rose-700 to-pink-600',
]

export default function BackgroundSelector({ setBackground }: { setBackground: (bg: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-white text-black px-4 py-2 rounded"
      >
        Change Background
      </button>
      {isOpen && (
        <motion.div 
          className="flex mt-2 space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {backgrounds.map((bg, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded ${bg}`}
              onClick={() => {
                setBackground(bg)
                setIsOpen(false)
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}