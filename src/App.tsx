import { Outlet } from 'react-router-dom'
import './App.css'
import BarraNav from './componentes/BarraNav'
import SecaodeReel from './componentes/Secao_Primeira'

function App() {
  return (
    <div className="App">
      <BarraNav />
      <SecaodeReel />
      <Outlet />
    </div>
  )
}

export default App
