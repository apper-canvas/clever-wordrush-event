import { AnimatePresence, motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Button from '@/components/atoms/Button'
    
    const Modal = ({ show, onClose, title, children }) => {
      return (
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glassmorphism rounded-2xl p-6 sm:p-8 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">{title}</h3>
                  <Button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Icon name="X" className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )
    }
    
    export default Modal