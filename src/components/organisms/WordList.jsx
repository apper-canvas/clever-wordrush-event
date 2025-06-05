import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    
    const WordList = ({ foundWords }) => {
      if (!foundWords || foundWords.length === 0) return null
    
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-heading font-semibold text-white mb-4 flex items-center">
            <Icon name="BookOpen" className="w-5 h-5 mr-2" />
            Found Words ({foundWords.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {foundWords.slice(-10).map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-medium"
              >
                {word} <span className="text-xs text-gray-400">+{word.length * 10}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )
    }
    
    export default WordList