import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [showHighScores, setShowHighScores] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

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
              <ApperIcon name="Zap" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-gradient">WordRush</h1>
              <p className="text-xs sm:text-sm text-gray-400">Fast-Paced Word Puzzle</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHighScores(true)}
              className="p-2 sm:p-3 glassmorphism rounded-xl hover:bg-white/20 transition-colors"
              title="High Scores"
            >
              <ApperIcon name="Trophy" className="w-5 h-5 text-amber-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className="p-2 sm:p-3 glassmorphism rounded-xl hover:bg-white/20 transition-colors"
              title="Settings"
            >
              <ApperIcon name="Settings" className="w-5 h-5 text-gray-300" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="relative z-10 px-4 sm:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <MainFeature />
        </div>
      </main>

      {/* Coming Soon Features */}
      <section className="relative z-10 px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl font-heading font-bold text-center mb-6 sm:mb-8 text-gray-200"
          >
            Coming Soon
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleComingSoonClick(feature.name)}
                className="glassmorphism p-4 sm:p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:shadow-glow transition-shadow">
                    <ApperIcon name={feature.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm sm:text-base text-white mb-2">{feature.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  <div className="mt-3 inline-flex items-center text-xs text-accent">
                    <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
                    Coming Soon
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High Scores Modal */}
      <AnimatePresence>
        {showHighScores && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHighScores(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism rounded-2xl p-6 sm:p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">High Scores</h3>
                <button
                  onClick={() => setShowHighScores(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="text-center py-8">
                <ApperIcon name="Trophy" className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">No scores yet!</p>
                <p className="text-sm text-gray-500">Play your first game to set a high score.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism rounded-2xl p-6 sm:p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Sound Effects</label>
                  <div className="relative">
                    <input type="checkbox" className="sr-only" defaultChecked />
                    <div className="w-10 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-primary rounded-full absolute top-1 right-1 transition-transform"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Dark Mode</label>
                  <div className="relative">
                    <input type="checkbox" className="sr-only" defaultChecked />
                    <div className="w-10 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-primary rounded-full absolute top-1 right-1 transition-transform"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-300 block mb-2">Difficulty</label>
                  <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-primary outline-none">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home