import { Link } from 'react-router-dom'
import './PaginadeLogin.css'

const PaginaDeEntrada = () => {
  return (
    <div>
      <div className="container-login">
        <h3>Login</h3>
        <form action="" method="post" className="container-form">
          {' '}
          <label htmlFor="email">Email: </label>
          <input type="email" name="Email" id="email" className="input-login" />
          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            name="Password"
            id="senha"
            className="input-login"
          />
          <Link to="/cadastro">Cadastrar</Link>
          <button type="submit" className="btn-entrar">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaginaDeEntrada
