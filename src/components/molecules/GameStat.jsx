import { AnimatePresence, motion } from 'framer-motion'
    import Text from '@/components/atoms/Text'
    
    const GameStat = ({ label, value, valueClassName = '', labelClassName = '', showAnimation = false, animationValue = '' }) => {
      return (
        <div className="text-center">
          <div className={`font-heading font-bold relative ${valueClassName}`}>
            {value}
            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -30, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-accent font-bold"
                >
                  {animationValue}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Text animate={false} className={labelClassName}>{label}</Text>
        </div>
      )
    }
    
    export default GameStat