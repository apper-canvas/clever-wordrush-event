import { AnimatePresence, motion } from 'framer-motion'
    import Button from '@/components/atoms/Button'
    
    const PauseOverlay = ({ show, onResume, onEndGame }) => {
      return (
        <AnimatePresence>
          {show && (
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
                  <Button
                    onClick={onResume}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Resume Game
                  </Button>
                  <Button
                    onClick={onEndGame}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors"
                  >
                    End Game
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )
    }
    
    export default PauseOverlay