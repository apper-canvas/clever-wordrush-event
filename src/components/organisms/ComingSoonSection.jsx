import { motion } from 'framer-motion'
    import FeatureCard from '@/components/molecules/FeatureCard'
    
    const ComingSoonSection = ({ features, onFeatureClick }) => {
      return (
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
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.name}
                  feature={feature}
                  index={index}
                  onClick={onFeatureClick}
                />
              ))}
            </div>
          </div>
        </section>
      )
    }
    
    export default ComingSoonSection