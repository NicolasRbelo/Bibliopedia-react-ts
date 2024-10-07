import { Outlet } from 'react-router-dom'
import './App.css'
import BarraNav from './componentes/BarraNav'
function App() {
  return (
    <div className="App">
      <BarraNav />
      <Outlet />
    </div>
  )
}

export default App
