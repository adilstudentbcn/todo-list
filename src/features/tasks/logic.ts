import type { Task } from './types'

export const createNewTask = (text: string): Task => {
  const cleanText = text.trim()
  return {
    id: crypto.randomUUID(),
    text: cleanText,
    completed: false,
    createdAt: Date.now(),
  }
}
