import { useState, use } from 'react'
import { fetchInitialTasks } from '../api/tasks'
import type { Task } from '../types'

export const useTasks = () => {
  const [promise] = useState(() => fetchInitialTasks())

  const tasks = use(promise)
  
  return tasks
}