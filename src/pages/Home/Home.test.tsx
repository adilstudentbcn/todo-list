import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../shared/theme/theme'
import Home from './Home'

it('Home page smoke test', () => {
  render(
    <ChakraProvider value={theme}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </ChakraProvider>,
  )
})
