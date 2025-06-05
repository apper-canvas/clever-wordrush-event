import Label from '@/components/atoms/Label'
    import ToggleSwitch from '@/components/atoms/ToggleSwitch'
    
    const SettingItem = ({ label, type, options, value, onChange }) => {
      return (
        <div className="flex items-center justify-between">
          <Label className="text-gray-300">{label}</Label>
          {type === 'toggle' && (
            <ToggleSwitch checked={value} onChange={onChange} />
          )}
          {type === 'select' && (
            <select
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-primary outline-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      )
    }
    
    export default SettingItem