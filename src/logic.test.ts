import { describe, it, expect } from 'vitest'
import { createNewTask } from './logic'

describe('Logic: createNewTask', () => {
  it('should create a task object with the correct text', () => {
    const text = 'Finish the assignment'
    const result = createNewTask(text)

    expect(result.text).toBe(text)
  })

  it('should initialize task as not completed', () => {
    const result = createNewTask('New task')
    expect(result.completed).toBe(false)
  })

  it('should generate a unique string ID for every task', () => {
    const task1 = createNewTask('Task 1')
    const task2 = createNewTask('Task 2')

    expect(typeof task1.id).toBe('string')
    expect(task1.id).not.toBe(task2.id)
  })
})
