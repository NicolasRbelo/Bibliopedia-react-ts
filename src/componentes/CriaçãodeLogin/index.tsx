import { useState } from 'react'
import './PaginaDeLogin.css'
import { useNavigate } from 'react-router-dom'

interface User {
  Nome: string
  Email: string
  Senha: string
}

const PaginaParaCriacao = () => {
  const [formData, setFormData] = useState<User>({
    Nome: '',
    Email: '',
    Senha: '',
  })
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const setLoginVazio = () => {
    setFormData({
      Nome: '',
      Email: '',
      Senha: '',
    })
  }

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Dados enviados:', formData)

    try {
      const response = await fetch('http://127.0.0.1:5500/usuario', {
        method: 'POST', // Verifique a rota correta do seu backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Cadastro realizado com sucesso:', data)
        navigate('/login') // Redireciona para a página de login após o cadastro bem-sucedido
      } else {
        const errorData = await response.json() // Obtenha a mensagem de erro do backend
        setMensagemErro(
          errorData.message || 'Erro ao Cadastrar. Verifique suas credenciais.'
        )
        setLoginVazio()
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error)
      setMensagemErro('Erro de conexão com o servidor.')
      setLoginVazio()
    }
  }

  return (
    <div>
      <div className="container-login">
        <h3>Cadastro</h3>
        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
        <form
          action=""
          method="post"
          className="container-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="Nome">Nome do Usuario: </label>
          <input
            type="text"
            name="Nome"
            id="Nome"
            className="input-login"
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="Email"
            id="email"
            className="input-login"
            onChange={handleInputChange}
          />
          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            name="Senha"
            id="senha"
            className="input-login"
            onChange={handleInputChange}
          />
          <button type="submit" className="btn-entrar">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaginaParaCriacao
