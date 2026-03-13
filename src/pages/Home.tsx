import { useState, useEffect } from 'react'
import { VStack, Heading, Box, Text, Separator } from '@chakra-ui/react'
import type { Task } from '../types' 
import { createNewTask } from '../logic'
import TodoInput from '../TodoInput'
import TodoItem from '../TodoItem'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('personal-todo-list')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('personal-todo-list', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (text: string) => {
    const newTask = createNewTask(text)
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const updateTask = (id: string, newText: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  }

  const remainingTasks = tasks.filter(t => !t.completed).length

  return (
    <VStack gap={8} align="stretch">
      <Heading textAlign="center" color="brand.500">My Planner</Heading>
      
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
        <TodoInput onAdd={handleAddTask} />
      </Box>

      <Box>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask} 
          />
        ))}
      </Box>

      {tasks.length > 0 && (
        <Box textAlign="center" pt={4}>
          <Separator mb={4} />
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            {remainingTasks} {remainingTasks === 1 ? 'task' : 'tasks'} remaining out of {tasks.length}
          </Text>
        </Box>
      )}
    </VStack>
  )
}