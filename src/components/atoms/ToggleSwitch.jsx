import React from 'react'
    
    const ToggleSwitch = ({ checked, onChange, label, className = '' }) => {
      return (
        <div className={`flex items-center justify-between ${className}`}>
          {label && <label className="text-gray-300">{label}</label>}
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
            <div className="w-10 h-6 bg-gray-600 rounded-full relative cursor-pointer" onClick={onChange}>
              <div
                className={`w-4 h-4 bg-primary rounded-full absolute top-1 transition-transform ${
                  checked ? 'right-1' : 'left-1'
                }`}
              ></div>
            </div>
          </div>
        </div>
      )
    }
    
    export default ToggleSwitch