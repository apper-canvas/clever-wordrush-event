import gameConfigs from '../mockData/gameConfig.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...gameConfigs]

export const getAll = async () => {
  await delay(300)
  return [...data]
}

export const getById = async (id) => {
  await delay(200)
  const item = data.find(config => config.id === id)
  if (!item) {
    // Return default config if none exists
    const defaultConfig = {
      id: 1,
      difficulty: 'medium',
      soundEnabled: true,
      theme: 'dark',
      hintsPerGame: 3
    }
    data.push(defaultConfig)
    return { ...defaultConfig }
  }
  return { ...item }
}

export const create = async (configData) => {
  await delay(300)
  const newConfig = {
    id: Date.now(),
    ...configData
  }
  data.push(newConfig)
  return { ...newConfig }
}

export const update = async (id, updates) => {
  await delay(250)
  const index = data.findIndex(config => config.id === id)
  if (index === -1) {
    throw new Error('Game config not found')
  }
  data[index] = { ...data[index], ...updates }
  return { ...data[index] }
}

export const delete_ = async (id) => {
  await delay(200)
  const index = data.findIndex(config => config.id === id)
  if (index === -1) {
    throw new Error('Game config not found')
  }
  data.splice(index, 1)
  return true
}