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
import { ErrorBoundary } from '../../shared/components/ErrorBoundary/ErrorBoundary'
import { useTasks } from '../../features/tasks/services/useTasks'
import { useTaskStore } from '../../features/tasks/store/useTaskStore'
import {
  FilterProvider,
  useFilter,
} from '../../features/tasks/context/FilterContext'
import TodoItem from '../../features/tasks/components/TodoItem'
import TodoInput from '../../features/tasks/components/TodoInput'
import type { Task } from '../../shared/types/types'

const TodoListContent = ({ initialTasks }: { initialTasks: Task[] }) => {
  const { tasks, setTasks, toggleTask, deleteTask, updateTask } = useTaskStore()
  const { filter, setFilter } = useFilter()

  useEffect(() => {
    if (tasks.length === 0) setTasks(initialTasks)
  }, [initialTasks, setTasks, tasks.length])

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <VStack gap={4} align="stretch" w="100%">
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
  return <TodoListContent initialTasks={fetchedTasks} />
}

export default function Home() {
  const addTask = useTaskStore((state) => state.addTask)

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading mb={6} textAlign="center">
        My Planner
      </Heading>

      <Box mb={8}>
        <TodoInput onAdd={addTask} />
      </Box>

      <ErrorBoundary>
        <FilterProvider>
          <Suspense
            fallback={
              <VStack py={10}>
                <Spinner size="xl" color="blue.500" />
                <Text>Loading server tasks...</Text>
              </VStack>
            }
          >
            <TaskListFetcher />
          </Suspense>
        </FilterProvider>
      </ErrorBoundary>
    </Box>
  )
}
