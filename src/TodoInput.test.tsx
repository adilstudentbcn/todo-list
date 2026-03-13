/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react' 
import theme from './theme'                      
import TodoInput from './TodoInput'

describe('TodoInput Component', () => {
  it('should call onAdd when the add button is clicked', async () => {
    const onAddMock = vi.fn()
    
    
    render(
      <ChakraProvider value={theme}>
        <TodoInput onAdd={onAddMock} />
      </ChakraProvider>
    )

    const input = screen.getByPlaceholderText(/What needs to be done\?/i)
    const button = screen.getByRole('button', { name: /Add/i })

    await userEvent.type(input, 'New Testing Task')
    await userEvent.click(button)

    expect(onAddMock).toHaveBeenCalledWith('New Testing Task')
    expect(input).toHaveValue('')
  })
})