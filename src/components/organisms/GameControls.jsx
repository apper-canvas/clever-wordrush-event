import Button from '@/components/atoms/Button'
    import Icon from '@/components/atoms/Icon'
    
    const GameControls = ({ onShuffle, onUseHint, hintsRemaining, onTogglePause, isPaused }) => {
      return (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button
            onClick={onShuffle}
            className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/20"
          >
            <Icon name="Shuffle" className="w-5 h-5" />
            <span className="text-sm">Shuffle</span>
          </Button>
          
          <Button
            onClick={onUseHint}
            disabled={hintsRemaining <= 0}
            className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/20 disabled:opacity-50"
          >
            <Icon name="Lightbulb" className="w-5 h-5" />
            <span className="text-sm">Hint ({hintsRemaining || 0})</span>
          </Button>
          
          <Button
            onClick={onTogglePause}
            className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/20"
          >
            <Icon name={isPaused ? "Play" : "Pause"} className="w-5 h-5" />
            <span className="text-sm">{isPaused ? 'Resume' : 'Pause'}</span>
          </Button>
        </div>
      )
    }
    
    export default GameControls