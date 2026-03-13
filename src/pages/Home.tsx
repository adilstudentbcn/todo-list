// Final Version with Data Fetching and Input

import { Suspense, useState } from 'react'
import { Box, Heading, VStack, Spinner, Text } from '@chakra-ui/react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useTasks } from '../services/useTasks'
import TodoItem from '../TodoItem'
import TodoInput from '../TodoInput'
import { createNewTask } from '../logic'
import type { Task } from '../types'

const TodoList = ({ initialTasks }: { initialTasks: Task[] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const handleAddTask = (text: string) =>
    setTasks([...tasks, createNewTask(text)])

  const handleToggle = (id: string) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )

  const handleDelete = (id: string) =>
    setTasks(tasks.filter((t) => t.id !== id))

  const handleUpdate = (id: string, newText: string) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)))

  return (
    <VStack gap={4} align="stretch" w="100%">
      <TodoInput onAdd={handleAddTask} />

      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </VStack>
  )
}

const TaskListFetcher = () => {
  const fetchedTasks = useTasks()
  return <TodoList initialTasks={fetchedTasks} />
}

export default function Home() {
  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading mb={6} textAlign="center">
        My Tasks
      </Heading>

      <ErrorBoundary>
        <Suspense
          fallback={
            <VStack py={10}>
              <Spinner size="xl" color="blue.500" />
              <Text>Loading your tasks...</Text>
            </VStack>
          }
        >
          <TaskListFetcher />
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}
