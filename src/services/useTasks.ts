import { useState, use } from 'react'
import { fetchInitialTasks } from '../api/tasks'
import type { Task } from '../types'

export const useTasks = (): Task[] => {
  const [promise] = useState<Promise<Task[]>>(() => fetchInitialTasks())

  const tasks = use(promise)

  return tasks
}
