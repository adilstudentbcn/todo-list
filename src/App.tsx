import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import About from './pages/About'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

function App() {
  return <RouterProvider router={router} />
}

export default App
