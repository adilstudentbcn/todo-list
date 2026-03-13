import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import App from './App'

it('App smoke test', () => {
  render(
    <ChakraProvider value={theme}>
      <App />
    </ChakraProvider>
  )
})