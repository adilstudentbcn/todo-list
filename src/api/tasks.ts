import type { Task } from '../types'

export const fetchInitialTasks = async (): Promise<Task[]> => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=3',
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tasks from server')
  }

  const data = await response.json()

  return data.map((item: any) => ({
    id: crypto.randomUUID(),
    text: item.title,
    completed: item.completed,
    createdAt: Date.now(),
  }))
}
