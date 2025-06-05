const Label = ({ children, className = '', htmlFor, ...props }) => {
      return (
        <label htmlFor={htmlFor} className={className} {...props}>
          {children}
        </label>
      )
    }
    
    export default Label