import { Box, Container, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Outlet, Link } from 'react-router-dom'

export default function RootLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Navigation Bar */}
      <Box borderBottomWidth="1px" py={4} bg="white" shadow="sm">
        <Container maxW="md">
          <HStack gap={8}>
            
            {/* Standard React Router Link wrapping a Chakra 'span' */}
            <Link to="/">
              <ChakraLink as="span" fontWeight="bold" color="blue.500">
                Tasks
              </ChakraLink>
            </Link>

            <Link to="/about">
              <ChakraLink as="span" fontWeight="bold" color="blue.500">
                About
              </ChakraLink>
            </Link>

          </HStack>
        </Container>
      </Box>
      
      {/* Main Content Area */}
      <Container maxW="md" py={8}>
        <Outlet /> 
      </Container>
    </Box>
  )
}