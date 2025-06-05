import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import * as gameStateService from '../services/api/gameStateService'
import * as highScoreService from '../services/api/highScoreService'

const MainFeature = () => {
  const [gameState, setGameState] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentWord, setCurrentWord] = useState('')
  const [selectedLetters, setSelectedLetters] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [wordValidation, setWordValidation] = useState(null)
  const [scoreAnimation, setScoreAnimation] = useState(null)

  // Load initial game state
  useEffect(() => {
    const loadGameState = async () => {
      setLoading(true)
      try {
        const state = await gameStateService.getById(1)
        setGameState(state)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadGameState()
  }, [])

  // Timer countdown effect
  useEffect(() => {
    let interval
    if (isGameActive && !isPaused && gameState?.timeRemaining > 0) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining <= 1) {
            setIsGameActive(false)
            endGame(prev)
            return { ...prev, timeRemaining: 0 }
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameActive, isPaused, gameState?.timeRemaining])

  const endGame = async (finalState) => {
    try {
      await highScoreService.create({
        score: finalState.score,
        wordsFound: finalState.foundWords.length,
        longestWord: finalState.foundWords.reduce((longest, word) => 
          word.length > longest.length ? word : longest, ''),
        level: finalState.currentLevel
      })
      toast.success(`Game Over! Final Score: ${finalState.score}`, {
        icon: "🎉"
      })
    } catch (err) {
      console.error('Error saving high score:', err)
    }
  }

  const startNewGame = async () => {
    setLoading(true)
    try {
      const newState = await gameStateService.create({
        currentLevel: 1,
        score: 0,
        timeRemaining: 120,
        letters: generateRandomLetters(8),
        foundWords: [],
        hintsRemaining: 3
      })
      setGameState(newState)
      setIsGameActive(true)
      setIsPaused(false)
      setCurrentWord('')
      setSelectedLetters([])
      toast.success("New game started! Good luck!", {
        icon: "🚀"
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateRandomLetters = (count) => {
    const vowels = ['A', 'E', 'I', 'O', 'U']
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
    const letters = []
    
    // Ensure at least 2 vowels
    for (let i = 0; i < 2; i++) {
      letters.push(vowels[Math.floor(Math.random() * vowels.length)])
    }
    
    // Fill remaining with mix of vowels and consonants
    for (let i = 2; i < count; i++) {
      const useVowel = Math.random() < 0.3
      const source = useVowel ? vowels : consonants
      letters.push(source[Math.floor(Math.random() * source.length)])
    }
    
    // Shuffle array
    return letters.sort(() => Math.random() - 0.5)
  }

  const validateWord = (word) => {
    // Simple word validation - in a real app, you'd use a dictionary API
    const validWords = [
      'CAT', 'DOG', 'BIRD', 'FISH', 'TREE', 'HOUSE', 'CAR', 'BOOK', 'LOVE', 'HOPE',
      'PLAY', 'GAME', 'WORD', 'TIME', 'GOOD', 'BEST', 'HELP', 'WORK', 'MAKE', 'TAKE',
      'COME', 'GIVE', 'THINK', 'WORLD', 'GREAT', 'MAGIC', 'POWER', 'LIGHT', 'WATER',
      'MUSIC', 'DREAM', 'HAPPY', 'SMILE', 'PEACE', 'BRAVE', 'SMART', 'QUICK', 'FRESH'
    ]
    return validWords.includes(word.toUpperCase()) && word.length >= 3
  }

  const handleLetterClick = (letter, index) => {
    if (!isGameActive || isPaused) return
    
    if (selectedLetters.includes(index)) {
      // Deselect letter
      setSelectedLetters(prev => prev.filter(i => i !== index))
      setCurrentWord(prev => {
        const letterIndex = prev.indexOf(letter)
        return prev.slice(0, letterIndex) + prev.slice(letterIndex + 1)
      })
    } else {
      // Select letter
      setSelectedLetters(prev => [...prev, index])
      setCurrentWord(prev => prev + letter)
    }
  }

  const submitWord = async () => {
    if (!currentWord || currentWord.length < 3) {
      setWordValidation('invalid')
      toast.error("Words must be at least 3 letters long!")
      setTimeout(() => setWordValidation(null), 500)
      return
    }

    if (gameState.foundWords.includes(currentWord.toUpperCase())) {
      setWordValidation('invalid')
      toast.error("You already found that word!")
      setTimeout(() => setWordValidation(null), 500)
      return
    }

    if (validateWord(currentWord)) {
      const points = calculatePoints(currentWord)
      const updatedState = {
        ...gameState,
        score: gameState.score + points,
        foundWords: [...gameState.foundWords, currentWord.toUpperCase()]
      }
      
      try {
        await gameStateService.update(gameState.id, updatedState)
        setGameState(updatedState)
        setWordValidation('valid')
        setScoreAnimation(`+${points}`)
        
        toast.success(`Great word! +${points} points`, {
          icon: "🎯"
        })
        
        setTimeout(() => {
          setWordValidation(null)
          setScoreAnimation(null)
        }, 1000)
        
        // Check for level progression
        if (updatedState.foundWords.length % 5 === 0) {
          levelUp(updatedState)
        }
      } catch (err) {
        setError(err.message)
      }
    } else {
      setWordValidation('invalid')
      toast.error("Not a valid word!")
      setTimeout(() => setWordValidation(null), 500)
    }

    // Clear current word
    setCurrentWord('')
    setSelectedLetters([])
  }

  const levelUp = async (currentState) => {
    const newLevel = currentState.currentLevel + 1
    const newLetters = generateRandomLetters(Math.min(8 + newLevel, 12))
    const bonusTime = 30
    
    const updatedState = {
      ...currentState,
      currentLevel: newLevel,
      letters: newLetters,
      timeRemaining: currentState.timeRemaining + bonusTime
    }
    
    try {
      await gameStateService.update(gameState.id, updatedState)
      setGameState(updatedState)
      toast.success(`Level ${newLevel}! New letters and +${bonusTime}s bonus!`, {
        icon: "⭐"
      })
    } catch (err) {
      setError(err.message)
    }
  }

  const calculatePoints = (word) => {
    const basePoints = word.length * 10
    const lengthBonus = word.length >= 6 ? word.length * 5 : 0
    return basePoints + lengthBonus
  }

  const useHint = async () => {
    if (gameState.hintsRemaining <= 0) {
      toast.error("No hints remaining!")
      return
    }

    // Simple hint: highlight a vowel
    const vowelIndices = gameState.letters.map((letter, index) => 
      ['A', 'E', 'I', 'O', 'U'].includes(letter) ? index : -1
    ).filter(index => index !== -1)

    if (vowelIndices.length > 0) {
      const hintIndex = vowelIndices[Math.floor(Math.random() * vowelIndices.length)]
      setSelectedLetters([hintIndex])
      setCurrentWord(gameState.letters[hintIndex])
      
      const updatedState = {
        ...gameState,
        hintsRemaining: gameState.hintsRemaining - 1
      }
      
      try {
        await gameStateService.update(gameState.id, updatedState)
        setGameState(updatedState)
        toast.info("Hint used! Try building from this letter.", {
          icon: "💡"
        })
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const shuffleLetters = async () => {
    const shuffled = [...gameState.letters].sort(() => Math.random() - 0.5)
    const updatedState = { ...gameState, letters: shuffled }
    
    try {
      await gameStateService.update(gameState.id, updatedState)
      setGameState(updatedState)
      setCurrentWord('')
      setSelectedLetters([])
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading game...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Game Header */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between glassmorphism rounded-2xl p-4 sm:p-6 mb-6"
        >
          {/* Score and Level */}
          <div className="flex items-center space-x-4 sm:space-x-8 mb-4 sm:mb-0">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-gradient relative">
                {gameState?.score || 0}
                <AnimatePresence>
                  {scoreAnimation && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -30, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-accent font-bold"
                    >
                      {scoreAnimation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-sm text-gray-400">Score</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-heading font-bold text-white">
                {gameState?.currentLevel || 1}
              </div>
              <p className="text-sm text-gray-400">Level</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-heading font-bold text-white">
                {gameState?.foundWords?.length || 0}
              </div>
              <p className="text-sm text-gray-400">Words</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex-1 max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Time</span>
              <span className={`font-mono font-bold ${gameState?.timeRemaining <= 10 ? 'text-secondary animate-pulse' : 'text-white'}`}>
                {Math.floor((gameState?.timeRemaining || 0) / 60)}:{((gameState?.timeRemaining || 0) % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full timer-bar ${gameState?.timeRemaining <= 10 ? 'bg-gradient-to-r from-secondary to-red-600 timer-urgent' : 'bg-gradient-to-r from-primary to-accent'}`}
                style={{ width: `${((gameState?.timeRemaining || 0) / 120) * 100}%` }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {!isGameActive && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startNewGame}
            disabled={loading}
            className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-heading font-bold text-lg shadow-glow hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {gameState?.foundWords?.length > 0 ? 'New Game' : 'Start Game'}
          </motion.button>
        )}
      </div>

      {/* Game Board */}
      {isGameActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Letter Circle */}
          <div className="relative mb-8">
            <div className="game-board-bg w-80 h-80 sm:w-96 sm:h-96 mx-auto rounded-full border-2 border-white/20 relative">
              {gameState?.letters?.map((letter, index) => {
                const angle = (index * 360) / gameState.letters.length
                const radius = 120
                const x = Math.cos((angle - 90) * Math.PI / 180) * radius
                const y = Math.sin((angle - 90) * Math.PI / 180) * radius
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLetterClick(letter, index)}
                    className={`letter-tile absolute w-12 h-12 sm:w-16 sm:h-16 rounded-xl font-heading font-bold text-lg sm:text-xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedLetters.includes(index)
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
              })}
            </div>
          </div>

          {/* Word Input Area */}
          <div className="text-center mb-8">
            <div className={`inline-block min-w-[200px] px-6 py-4 bg-gray-800/50 rounded-2xl border-2 transition-all duration-300 ${
              wordValidation === 'valid' ? 'border-accent shadow-neon word-valid' :
              wordValidation === 'invalid' ? 'border-secondary word-invalid' :
              'border-gray-600'
            }`}>
              <input
                type="text"
                value={currentWord}
                onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && submitWord()}
                placeholder="Form a word..."
                className="bg-transparent text-center text-xl sm:text-2xl font-heading font-bold text-white placeholder-gray-500 outline-none w-full"
                maxLength={12}
              />
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={submitWord}
                disabled={!currentWord || currentWord.length < 3}
                className="bg-gradient-to-r from-accent to-accent/80 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-glow transition-all"
              >
                Submit Word
              </motion.button>
              
              <button
                onClick={() => {
                  setCurrentWord('')
                  setSelectedLetters([])
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shuffleLetters}
              className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/20 transition-colors"
            >
              <ApperIcon name="Shuffle" className="w-5 h-5" />
              <span className="text-sm">Shuffle</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={useHint}
              disabled={gameState?.hintsRemaining <= 0}
              className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <ApperIcon name="Lightbulb" className="w-5 h-5" />
              <span className="text-sm">Hint ({gameState?.hintsRemaining || 0})</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/20 transition-colors"
            >
              <ApperIcon name={isPaused ? "Play" : "Pause"} className="w-5 h-5" />
              <span className="text-sm">{isPaused ? 'Resume' : 'Pause'}</span>
            </motion.button>
          </div>

          {/* Found Words */}
          {gameState?.foundWords?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-2xl p-4 sm:p-6"
            >
              <h3 className="font-heading font-semibold text-white mb-4 flex items-center">
                <ApperIcon name="BookOpen" className="w-5 h-5 mr-2" />
                Found Words ({gameState.foundWords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {gameState.foundWords.slice(-10).map((word, index) => (
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
          )}
        </motion.div>
      )}

      {/* Pause Overlay */}
      <AnimatePresence>
        {isPaused && isGameActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glassmorphism rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Game Paused</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setIsPaused(false)}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Resume Game
                </button>
                <button
                  onClick={() => {
                    setIsGameActive(false)
                    setIsPaused(false)
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  End Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature