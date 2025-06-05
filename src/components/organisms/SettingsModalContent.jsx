import SettingItem from '@/components/molecules/SettingItem'
    import Label from '@/components/atoms/Label'
    
    const SettingsModalContent = () => {
      return (
        <div className="space-y-4">
          <SettingItem label="Sound Effects" type="toggle" checked={true} onChange={() => {}} />
          <SettingItem label="Dark Mode" type="toggle" checked={true} onChange={() => {}} />
          <div>
            <Label className="text-gray-300 block mb-2">Difficulty</Label>
            <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-primary outline-none">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>
      )
    }
    
    export default SettingsModalContent