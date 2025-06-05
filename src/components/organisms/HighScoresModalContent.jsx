import Icon from '@/components/atoms/Icon'
    import Text from '@/components/atoms/Text'
    
    const HighScoresModalContent = () => {
      return (
        <div className="text-center py-8">
          <Icon name="Trophy" className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <Text animate={false} className="text-gray-300 mb-2">No scores yet!</Text>
          <Text animate={false} className="text-sm text-gray-500">Play your first game to set a high score.</Text>
        </div>
      )
    }
    
    export default HighScoresModalContent