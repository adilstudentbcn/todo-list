import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router' // or 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import About from './About'

it('About page smoke test', () => {
  render(
    <ChakraProvider value={theme}>
      <MemoryRouter>
        <About />
      </MemoryRouter>
    </ChakraProvider>
  )
})