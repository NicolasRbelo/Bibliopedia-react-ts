import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ConfigPerfil.css'

export const ConfigPerfil = () => {
  const [nomeUsuario, setNomeUsuario] = useState('Perfil') // Estado para armazenar o nome do usuário

  // Função que faz a requisição GET para obter o perfil do usuário
  const getPerfil = async () => {
    const token = localStorage.getItem('user_token')

    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:5500/usuario/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setNomeUsuario(data.usuario.NomeUsuario) // Define o nome do usuário no estado
        } else {
          console.error('Erro ao obter o perfil do usuário', response.status)
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error)
      }
    }
  }

  // useEffect para buscar o perfil do usuário quando o componente for montado
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getPerfil()
  }, []) // O array vazio significa que essa função rodará apenas uma vez após o componente ser montado

  const handleClick = async () => {
    const token = localStorage.getItem('user_token')

    if (token) {
      try {
        const response = await fetch('http://127.0.0.1:5500/logout', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          localStorage.removeItem('user_token')
          alert('Logout feito com sucesso')
          location.reload()
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error)
      }
    }
  }

  return (
    <div className="dropdown">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button className="dropbtn">{nomeUsuario}</button>{' '}
      {/* Exibe o nome do usuário */}
      <div className="dropdown-content">
        <Link to="/perfil">Acessar</Link>
        {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    </div>
  )
}
