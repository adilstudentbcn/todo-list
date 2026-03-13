import { create } from 'zustand'
import type { Task } from '../types'
import { createNewTask } from '../logic'

interface TaskState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (text: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, newText: string) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  addTask: (text) =>
    set((state) => ({
      tasks: [createNewTask(text), ...state.tasks],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  updateTask: (id, newText) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t,
      ),
    })),
}))
