import Button from '@/components/atoms/Button'
    import Input from '@/components/atoms/Input'
    import { motion } from 'framer-motion'
    
    const WordInput = ({ currentWord, setCurrentWord, onSubmit, onClear, validationState }) => {
      return (
        <div className="text-center mb-8">
          <div className={`inline-block min-w-[200px] px-6 py-4 bg-gray-800/50 rounded-2xl border-2 transition-all duration-300 ${
            validationState === 'valid' ? 'border-accent shadow-neon word-valid' :
            validationState === 'invalid' ? 'border-secondary word-invalid' :
            'border-gray-600'
          }`}>
            <Input
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
              placeholder="Form a word..."
              className="bg-transparent text-center text-xl sm:text-2xl font-heading font-bold text-white placeholder-gray-500 w-full"
              maxLength={12}
            />
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={onSubmit}
              disabled={!currentWord || currentWord.length < 3}
              className="bg-gradient-to-r from-accent to-accent/80 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-glow"
            >
              Submit Word
            </Button>
            
            <Button
              onClick={onClear}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl"
            >
              Clear
            </Button>
          </div>
        </div>
      )
    }
    
    export default WordInput