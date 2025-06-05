import { motion } from 'framer-motion'
    import Text from '@/components/atoms/Text'
    
    const ProgressBar = ({ label, value, max, className = '', barClassName = '' }) => {
      const percentage = (value / max) * 100
      const isUrgent = value <= 10
    
      return (
        <div className={`flex-1 ${className}`}>
          <div className="flex items-center justify-between mb-2">
            <Text animate={false} className="text-sm text-gray-400">{label}</Text>
            <span className={`font-mono font-bold ${isUrgent ? 'text-secondary animate-pulse' : 'text-white'}`}>
              {Math.floor(value / 60)}:{((value % 60) || 0).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className={`h-3 rounded-full timer-bar ${isUrgent ? 'bg-gradient-to-r from-secondary to-red-600 timer-urgent' : 'bg-gradient-to-r from-primary to-accent'} ${barClassName}`}
              style={{ width: `${percentage}%` }}
            ></motion.div>
          </div>
        </div>
      )
    }
    
    export default ProgressBar