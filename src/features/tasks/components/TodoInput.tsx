import { useState } from 'react'
import { HStack, Input, Button } from '@chakra-ui/react'

interface Props {
  onAdd: (text: string) => void
}

function TodoInput({ onAdd }: Props) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    if (inputValue.trim() === '') return
    onAdd(inputValue)
    setInputValue('')
  }

  return (
    <HStack gap={3} width="100%">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
      />
      <Button
        bg="brand.500"
        color="white"
        _hover={{ bg: 'brand.700' }}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </HStack>
  )
}

export default TodoInput
