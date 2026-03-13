import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <Box>
      <VStack gap={6} py={10} align="center">
        <Heading color="brand.500">About My Planner</Heading>
        <Text textAlign="center">
          This app helps you organize your daily tasks.
        </Text>

        <Link to="/">
          <Button colorPalette="blue" variant="solid">
            Back to Tasks
          </Button>
        </Link>
      </VStack>
    </Box>
  )
}
