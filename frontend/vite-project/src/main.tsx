import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main.tsx'
import UjKoncertek from './pages/UjKoncertek.tsx'
import NavBar from './pages/NavBar.tsx'

const router=createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/ujkoncertek",
    element: <UjKoncertek />,
  },
  {
    path: "/navbar",
    element: <NavBar />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar />
    <RouterProvider router={router}/>
  </StrictMode>,
)
