import { motion } from 'framer-motion'
    
    const LetterTile = ({ letter, index, isSelected, onClick }) => {
      const angle = (index * 360) / 8 // Assuming 8 letters as max for positioning
      const radius = 120
      const x = Math.cos((angle - 90) * Math.PI / 180) * radius
      const y = Math.sin((angle - 90) * Math.PI / 180) * radius
    
      return (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={`letter-tile absolute w-12 h-12 sm:w-16 sm:h-16 rounded-xl font-heading font-bold text-lg sm:text-xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
            isSelected
              ? 'bg-gradient-to-br from-accent to-accent/80 text-white shadow-neon selected'
              : 'bg-gradient-to-br from-white to-gray-100 text-gray-800 shadow-card hover:shadow-glow'
          }`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`
          }}
        >
          {letter}
        </motion.button>
      )
    }
    
    export default LetterTile