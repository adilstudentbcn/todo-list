import { Component, type ReactNode } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={5} bg="red.50" color="red.500" borderRadius="md" textAlign="center">
          <Text fontWeight="bold">Something went wrong fetching data!</Text>
          <Text fontSize="sm" mb={4}>{this.state.error?.message}</Text>
          <Button size="sm" colorPalette="red" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}