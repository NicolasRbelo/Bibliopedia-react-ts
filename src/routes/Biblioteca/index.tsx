import './Biblioteca.css'
import { useNavigate } from 'react-router-dom'

export const Biblioteca = () => {
  const navigate = useNavigate()
  return (
    <div className="container-biblioteca">
      <h1>Minha Biblioteca</h1>
      <button
        type="button"
        onClick={() => {
          navigate('/home')
        }}
      >
        Voltar para a pagina principal
      </button>
      <div className="container-livros">Livros</div>
    </div>
  )
}
