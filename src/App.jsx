import { Login, Signup, FourOfour, Verification } from "./Pages"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./Layout"

import { useSelector } from "react-redux"

function App() {

  const email = useSelector((state) => state.auth.email)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'verification',
          element: <Verification email={email} />
        }
      ]
    },
    {
      path: '*',
      element: <FourOfour />
    }

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
