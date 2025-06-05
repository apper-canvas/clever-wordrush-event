import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Text from '@/components/atoms/Text'
    
    const FeatureCard = ({ feature, index, onClick }) => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onClick(feature.name)}
          className="glassmorphism p-4 sm:p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group"
        >
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:shadow-glow transition-shadow">
              <Icon name={feature.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-heading font-semibold text-sm sm:text-base text-white mb-2">{feature.name}</h3>
            <Text animate={false} className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</Text>
            <div className="mt-3 inline-flex items-center text-xs text-accent">
              <Icon name="Clock" className="w-3 h-3 mr-1" />
              Coming Soon
            </div>
          </div>
        </motion.div>
      )
    }
    
    export default FeatureCard