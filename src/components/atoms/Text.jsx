import { motion } from 'framer-motion'
    
    const Text = ({ children, className = '', animate = true, initial = { opacity: 0, y: 20 }, animation = { opacity: 1, y: 0 }, transition, ...props }) => {
      if (animate) {
        return (
          <motion.p
            initial={initial}
            animate={animation}
            transition={transition}
            className={className}
            {...props}
          >
            {children}
          </motion.p>
        )
      }
      return (
        <p className={className} {...props}>
          {children}
        </p>
      )
    }
    
    export default Text