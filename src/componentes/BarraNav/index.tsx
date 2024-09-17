import { Link } from 'react-router-dom'
import BarradePesquisa from '../BarraDePesquisa'
import './BarraNav.css'

const BarraNav = () => {
  return (
    <header className="cabecario">
      <nav className="BarraNav">
        <BarradePesquisa />
        {/* Corrigir href para to */}
        <Link to="/" id="btn-nav">
          Home
        </Link>
        <Link to="/login" id="btn-nav">
          Entrar
        </Link>
      </nav>
    </header>
  )
}

export default BarraNav
