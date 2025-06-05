import { motion } from 'framer-motion'
    import GameStat from '@/components/molecules/GameStat'
    import ProgressBar from '@/components/molecules/ProgressBar'
    import Button from '@/components/atoms/Button'
    
    const GameHeader = ({ gameState, scoreAnimation, onStartGame, isGameActive, loading }) => {
      return (
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-between glassmorphism rounded-2xl p-4 sm:p-6 mb-6"
          >
            {/* Score and Level */}
            <div className="flex items-center space-x-4 sm:space-x-8 mb-4 sm:mb-0">
              <GameStat
                label="Score"
                value={gameState?.score || 0}
                valueClassName="text-2xl sm:text-3xl text-gradient"
                showAnimation={!!scoreAnimation}
                animationValue={scoreAnimation}
              />
              <GameStat
                label="Level"
                value={gameState?.currentLevel || 1}
                valueClassName="text-xl sm:text-2xl text-white"
              />
              <GameStat
                label="Words"
                value={gameState?.foundWords?.length || 0}
                valueClassName="text-xl sm:text-2xl text-white"
              />
            </div>
    
            {/* Timer */}
            <ProgressBar
              label="Time"
              value={gameState?.timeRemaining || 0}
              max={120} // Assuming max time is 120, adjust as needed
            />
          </motion.div>
    
          {!isGameActive && (
            <Button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onStartGame}
              disabled={loading}
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-heading font-bold text-lg shadow-glow hover:shadow-xl disabled:opacity-50"
            >
              {gameState?.foundWords?.length > 0 ? 'New Game' : 'Start Game'}
            </Button>
          )}
        </div>
      )
    }
    
    export default GameHeader