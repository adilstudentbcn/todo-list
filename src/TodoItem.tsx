import { useState } from 'react'
import { Box, Text, Button, HStack, Input } from '@chakra-ui/react'
import type { Task } from './types'

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, newText: string) => void
}

function TodoItem({ task, onToggle, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={3}
      mb={3}
      bg="white"
      shadow="sm"
    >
      <HStack justifyContent="space-between">
        <HStack gap={3} flex="1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />

          {isEditing ? (
            <Input
              size="sm"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
          ) : (
            <Text
              textDecoration={task.completed ? 'line-through' : 'none'}
              color={task.completed ? 'gray.400' : 'black'}
              onClick={() => !task.completed && setIsEditing(true)}
              cursor={task.completed ? 'default' : 'pointer'}
              flex="1"
            >
              {task.text}
            </Text>
          )}
        </HStack>

        <HStack gap={2}>
          {isEditing ? (
            <>
              <Button size="xs" colorPalette="green" onClick={handleSave}>
                Save
              </Button>
              <Button size="xs" variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              {!task.completed && (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
              <Button
                size="xs"
                variant="outline"
                colorPalette="red"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </Button>
            </>
          )}
        </HStack>
      </HStack>
    </Box>
  )
}

export default TodoItem
