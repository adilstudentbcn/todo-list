import { use } from 'react'
import { fetchInitialTasks } from '../api/tasks'
import type { Task } from '../../../shared/types/types'

const taskPromise = fetchInitialTasks()

export const useTasks = (): Task[] => {
  const tasks = use(taskPromise)
  return tasks
}
