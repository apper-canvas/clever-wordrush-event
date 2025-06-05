import { motion } from 'framer-motion'
    
    const Button = ({ children, onClick, className = '', title, disabled, whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, ...props }) => {
      return (
        <motion.button
          whileHover={whileHover}
          whileTap={whileTap}
          onClick={onClick}
          className={`transition-all duration-300 ${className}`}
          title={title}
          disabled={disabled}
          {...props}
        >
          {children}
        </motion.button>
      )
    }
    
    export default Button