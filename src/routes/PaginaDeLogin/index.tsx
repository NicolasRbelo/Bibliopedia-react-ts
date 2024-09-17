import './PaginaDelogin.css'

// const handleInputSubmit = () = {

// }

const PaginaDeLogin = () => {
  return (
    <div>
      <div className="container-login">
        <h3>Login</h3>
        <form action="" method="post" className="container-form">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" className="input-login" />

          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            name="senha"
            id="senha"
            className="input-login"
          />

          <button type="submit" className="btn-entrar">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaginaDeLogin
