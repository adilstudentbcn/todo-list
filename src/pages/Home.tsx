import { Suspense, useEffect } from 'react'
import {
  Box,
  Heading,
  VStack,
  Spinner,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useTasks } from '../services/useTasks'
import { useTaskStore } from '../store/useTaskStore'
import { FilterProvider, useFilter } from '../context/FilterContext'
import TodoItem from '../TodoItem'
import TodoInput from '../TodoInput'

const TodoListContent = ({ initialTasks }: { initialTasks: any[] }) => {
  const { tasks, setTasks, addTask, toggleTask, deleteTask, updateTask } =
    useTaskStore()

  const { filter, setFilter } = useFilter()

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks(initialTasks)
    }
  }, [initialTasks, setTasks, tasks.length])

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <VStack gap={4} align="stretch" w="100%">
      <TodoInput onAdd={addTask} />

      <HStack justifyContent="center" gap={4} py={2}>
        <Button
          size="sm"
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'solid' : 'outline'}
        >
          All
        </Button>
        <Button
          size="sm"
          onClick={() => setFilter('active')}
          variant={filter === 'active' ? 'solid' : 'outline'}
        >
          Active
        </Button>
        <Button
          size="sm"
          onClick={() => setFilter('completed')}
          variant={filter === 'completed' ? 'solid' : 'outline'}
        >
          Done
        </Button>
      </HStack>

      {filteredTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      ))}
    </VStack>
  )
}

const TaskListFetcher = () => {
  const fetchedTasks = useTasks()
  return (
    <FilterProvider>
      <TodoListContent initialTasks={fetchedTasks} />
    </FilterProvider>
  )
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
