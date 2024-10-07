import { Link } from 'react-router-dom'
import BarradePesquisa from '../BarraDePesquisa'
import './BarraNav.css'

const BarraNav = () => {
  const isAuthenticated = !!localStorage.getItem('user_token') // Verifica se o token existe
  const email = localStorage.getItem('user_email') // Recupera o email do usuário, se necessário

  return (
    <header className="cabecario">
      <nav className="BarraNav">
        <BarradePesquisa />
        <Link to="/" id="btn-nav">
          Home
        </Link>

        {/* Se o usuário estiver autenticado, mostre o perfil. Se não, mostre "Entrar" */}
        {isAuthenticated ? (
          <Link to="/perfil" id="btn-nav">
            Perfil {/* Pode mostrar o email ou um ícone */}
          </Link>
        ) : (
          <Link to="/login" id="btn-nav">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  )
}

export default BarraNav
