import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import LayoutAvaliacao from './routes/LayoutDeAvaliacao'
import PaginaDeEntrada from './routes/PaginaDeLogin'
import PaginaParaCriacao from './componentes/CriaçãodeLogin'

// Definindo as rotas da aplicação
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'livro/:livroId', // Caminho correto para a rota
        element: <LayoutAvaliacao />,
      },
      {
        path: 'login',
        element: <PaginaDeEntrada />,
      },
      {
        path: 'cadastro',
        element: <PaginaParaCriacao />,
      },
    ],
  },
])

// Renderiza o RouterProvider com as rotas configuradas
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Tipagem correta para TypeScript
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
