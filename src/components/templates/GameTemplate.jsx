import React from 'react'
    import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import GameHeader from '@/components/organisms/GameHeader'
    import GameBoard from '@/components/organisms/GameBoard'
    import GameControls from '@/components/organisms/GameControls'
    import WordList from '@/components/organisms/WordList'
    import PauseOverlay from '@/components/molecules/PauseOverlay'
    
    const GameTemplate = ({
      gameState,
      loading,
      error,
      scoreAnimation,
      isGameActive,
      isPaused,
      currentWord,
      selectedLetters,
      wordValidation,
      startNewGame,
      handleLetterClick,
      submitWord,
      clearCurrentWord,
      shuffleLetters,
      useHint,
      togglePause,
      endGameFromPause
    }) => {
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
              <Icon name="AlertCircle" className="w-8 h-8 text-red-400" />
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
          <GameHeader
            gameState={gameState}
            scoreAnimation={scoreAnimation}
            onStartGame={startNewGame}
            isGameActive={isGameActive}
            loading={loading}
          />
    
{isGameActive && (
            <>
              <GameBoard
                letters={gameState?.letters}
                onLetterClick={(letter, index) => handleLetterClick(letter, index)}
                currentWord={currentWord}
                onSubmitWord={submitWord}
                onClearWord={clearCurrentWord}
                wordValidation={wordValidation}
              />
    
              <GameControls
                onShuffle={shuffleLetters}
                onUseHint={useHint}
                hintsRemaining={gameState?.hintsRemaining}
                onTogglePause={togglePause}
                isPaused={isPaused}
              />
    
              <WordList foundWords={gameState?.foundWords} />
            </>
          )}
    
          <PauseOverlay
            show={isPaused && isGameActive}
            onResume={togglePause}
            onEndGame={endGameFromPause}
          />
        </div>
      )
    }
    
    export default GameTemplate