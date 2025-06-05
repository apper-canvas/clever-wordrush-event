const Input = ({ value, onChange, placeholder, className = '', onKeyPress, maxLength, ...props }) => {
      return (
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          className={`outline-none ${className}`}
          maxLength={maxLength}
          {...props}
        />
      )
    }
    
    export default Input