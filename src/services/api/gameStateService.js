import gameStates from '../mockData/gameState.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...gameStates]

export const getAll = async () => {
  await delay(300)
  return [...data]
}

export const getById = async (id) => {
  await delay(200)
  const item = data.find(state => state.id === id)
  if (!item) {
    // Create default game state if none exists
    const defaultState = {
      id: 1,
      currentLevel: 1,
      score: 0,
      timeRemaining: 120,
      letters: ['W', 'O', 'R', 'D', 'G', 'A', 'M', 'E'],
      foundWords: [],
      hintsRemaining: 3
    }
    data.push(defaultState)
    return { ...defaultState }
  }
  return { ...item }
}

export const create = async (gameStateData) => {
  await delay(300)
  const newGameState = {
    id: Date.now(),
    ...gameStateData
  }
  data.push(newGameState)
  return { ...newGameState }
}

export const update = async (id, updates) => {
  await delay(250)
  const index = data.findIndex(state => state.id === id)
  if (index === -1) {
    throw new Error('Game state not found')
  }
  data[index] = { ...data[index], ...updates }
  return { ...data[index] }
}

export const delete_ = async (id) => {
  await delay(200)
  const index = data.findIndex(state => state.id === id)
  if (index === -1) {
    throw new Error('Game state not found')
  }
  data.splice(index, 1)
  return true
}