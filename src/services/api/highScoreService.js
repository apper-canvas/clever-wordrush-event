import highScores from '../mockData/highScore.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let data = [...highScores]

export const getAll = async () => {
  await delay(300)
  return [...data].sort((a, b) => b.score - a.score)
}

export const getById = async (id) => {
  await delay(200)
  const item = data.find(score => score.id === id)
  if (!item) {
    throw new Error('High score not found')
  }
  return { ...item }
}

export const create = async (scoreData) => {
  await delay(300)
  const newScore = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...scoreData
  }
  data.push(newScore)
  return { ...newScore }
}

export const update = async (id, updates) => {
  await delay(250)
  const index = data.findIndex(score => score.id === id)
  if (index === -1) {
    throw new Error('High score not found')
  }
  data[index] = { ...data[index], ...updates }
  return { ...data[index] }
}

export const delete_ = async (id) => {
  await delay(200)
  const index = data.findIndex(score => score.id === id)
  if (index === -1) {
    throw new Error('High score not found')
  }
  data.splice(index, 1)
  return true
}