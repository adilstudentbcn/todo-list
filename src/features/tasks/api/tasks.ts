import type { Task } from '../../../shared/types/types'

interface JsonPlaceholderTodo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export const fetchInitialTasks = async (): Promise<Task[]> => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=3',
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tasks from server')
  }

  const data: JsonPlaceholderTodo[] = await response.json()

  return data.map((item) => ({
    id: crypto.randomUUID(),
    text: item.title,
    completed: item.completed,
    createdAt: Date.now(),
  }))
}
