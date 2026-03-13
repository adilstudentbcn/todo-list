import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../shared/theme/theme'
import RootLayout from './RootLayout'

it('RootLayout smoke test', () => {
  render(
    <ChakraProvider value={theme}>
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    </ChakraProvider>,
  )
})
