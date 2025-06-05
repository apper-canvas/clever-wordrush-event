import { motion } from 'framer-motion'
    import LetterTile from '@/components/molecules/LetterTile'
    import WordInput from '@/components/molecules/WordInput'
    
    const GameBoard = ({ letters, onLetterClick, currentWord, setCurrentWord, onSubmitWord, onClearWord, wordValidation }) => {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Letter Circle */}
          <div className="relative mb-8">
            <div className="game-board-bg w-80 h-80 sm:w-96 sm:h-96 mx-auto rounded-full border-2 border-white/20 relative">
              {letters?.map((letter, index) => (
                <LetterTile
                  key={index}
                  letter={letter}
                  index={index}
                  isSelected={false} // This should be passed from parent
                  onClick={() => onLetterClick(letter, index)}
                />
              ))}
            </div>
          </div>
    
          {/* Word Input Area */}
          <WordInput
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
            onSubmit={onSubmitWord}
            onClear={onClearWord}
            validationState={wordValidation}
          />
        </motion.div>
      )
    }
    
    export default GameBoard