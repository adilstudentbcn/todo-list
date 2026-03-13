import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../../shared/theme/theme'
import TodoItem from './TodoItem'
import type { Task } from '../../../shared/types/types'

describe('TodoItem Comprehensive Test', () => {
  const mockTask: Task = {
    id: '1',
    text: 'Test Comprehensive Task',
    completed: false,
    createdAt: Date.now(),
  }

  it('renders task text and verify buttons exist', () => {
    render(
      <ChakraProvider value={theme}>
        <TodoItem
          task={mockTask}
          onToggle={vi.fn()}
          onDelete={vi.fn()}
          onUpdate={vi.fn()}
        />
      </ChakraProvider>,
    )

    expect(screen.getByText('Test Comprehensive Task')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })
})
