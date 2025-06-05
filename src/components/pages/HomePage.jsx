import { useState, useEffect, useCallback } from 'react'
    import { motion } from 'framer-motion'
    import { toast } from 'react-toastify'
    import Icon from '@/components/atoms/Icon'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'
    import Modal from '@/components/molecules/Modal'
    import ComingSoonSection from '@/components/organisms/ComingSoonSection'
    import HighScoresModalContent from '@/components/organisms/HighScoresModalContent'
    import SettingsModalContent from '@/components/organisms/SettingsModalContent'
    import GameTemplate from '@/components/templates/GameTemplate'
    import * as gameStateService from '@/services/api/gameStateService'
    import * as highScoreService from '@/services/api/highScoreService'
    
    const HomePage = () => {
      const [showHighScores, setShowHighScores] = useState(false)
      const [showSettings, setShowSettings] = useState(false)
    
      // Game state
      const [gameState, setGameState] = useState(null)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const [currentWord, setCurrentWord] = useState('')
      const [selectedLetters, setSelectedLetters] = useState([])
      const [isGameActive, setIsGameActive] = useState(false)
      const [isPaused, setIsPaused] = useState(false)
      const [wordValidation, setWordValidation] = useState(null)
      const [scoreAnimation, setScoreAnimation] = useState(null)
    
      const comingSoonFeatures = [
        { name: "Multiplayer Mode", icon: "Users", description: "Challenge friends in real-time battles" },
        { name: "Daily Challenges", icon: "Calendar", description: "New puzzles every day with special rewards" },
        { name: "Power-ups", icon: "Zap", description: "Special abilities to boost your score" },
        { name: "Achievements", icon: "Trophy", description: "Unlock badges and track your progress" },
        { name: "Themes", icon: "Palette", description: "Customize your game experience" }
      ]
    
      const handleComingSoonClick = (featureName) => {
        toast.info(`${featureName} coming soon! Stay tuned for updates.`, {
          icon: "🚀"
        })
      }
    
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
    
      const clearCurrentWord = () => {
        setCurrentWord('')
        setSelectedLetters([])
      }
    
      const togglePause = () => {
        setIsPaused(prev => !prev)
      }
    
      const endGameFromPause = () => {
        setIsGameActive(false)
        setIsPaused(false)
      }
    
      return (
        <div className="min-h-screen relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>
    
          {/* Header */}
          <header className="relative z-10 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow">
                  <Icon name="Zap" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-heading font-bold text-gradient">WordRush</h1>
                  <Text animate={false} className="text-xs sm:text-sm text-gray-400">Fast-Paced Word Puzzle</Text>
                </div>
              </motion.div>
    
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  onClick={() => setShowHighScores(true)}
                  className="p-2 sm:p-3 glassmorphism rounded-xl hover:bg-white/20"
                  title="High Scores"
                >
                  <Icon name="Trophy" className="w-5 h-5 text-amber-400" />
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  className="p-2 sm:p-3 glassmorphism rounded-xl hover:bg-white/20"
                  title="Settings"
                >
                  <Icon name="Settings" className="w-5 h-5 text-gray-300" />
                </Button>
              </div>
            </div>
          </header>
    
          {/* Main Game Area */}
          <main className="relative z-10 px-4 sm:px-6 pb-8">
            <div className="max-w-4xl mx-auto">
              <GameTemplate
                gameState={gameState}
                loading={loading}
                error={error}
                scoreAnimation={scoreAnimation}
                isGameActive={isGameActive}
                isPaused={isPaused}
                currentWord={currentWord}
                selectedLetters={selectedLetters}
                wordValidation={wordValidation}
                startNewGame={startNewGame}
                handleLetterClick={handleLetterClick}
                submitWord={submitWord}
                clearCurrentWord={clearCurrentWord}
                shuffleLetters={shuffleLetters}
                useHint={useHint}
                togglePause={togglePause}
                endGameFromPause={endGameFromPause}
              />
            </div>
          </main>
    
          {/* Coming Soon Features */}
          <ComingSoonSection 
            features={comingSoonFeatures} 
            onFeatureClick={handleComingSoonClick} 
          />
    
          {/* High Scores Modal */}
          <Modal show={showHighScores} onClose={() => setShowHighScores(false)} title="High Scores">
            <HighScoresModalContent />
          </Modal>
    
          {/* Settings Modal */}
          <Modal show={showSettings} onClose={() => setShowSettings(false)} title="Settings">
            <SettingsModalContent />
          </Modal>
        </div>
      )
    }
    
    export default HomePage