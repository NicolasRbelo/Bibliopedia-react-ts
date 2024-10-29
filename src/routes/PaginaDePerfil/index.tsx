import type React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaginaDePerfil.css'

interface PaginaDePerfilProps {
  TokenId: string
}

export const PaginaDePerfil: React.FC<PaginaDePerfilProps> = ({ TokenId }) => {
  const navigate = useNavigate()
  const [imagemPerfilAntiga, setImagemPerfilAntiga] = useState<string | null>(
    null
  )
  const [imagemPerfil, setImagemPerfil] = useState<string | null>(null)
  const [antigoNome, setAntigoNome] = useState<string>()
  const [nomeUsuario, setNomeUsuario] = useState<string>('')
  const [antigoEmail, setAntigoEmail] = useState<string>()
  const [emailUsuario, setEmailUsuario] = useState<string>('')

  const getPerfil = async () => {
    if (TokenId) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5500/usuario/${TokenId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setAntigoNome(data.usuario.NomeUsuario)
          setImagemPerfilAntiga(data.usuario.ImagemUsuario)
          setAntigoEmail(data.usuario.EmailUsuario)
        } else {
          console.error('Erro ao obter o perfil do usuário', response.status)
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error)
      }
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getPerfil()
  }, [])

  const putPerfil = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (TokenId) {
      try {
        // Criando um objeto FormData para enviar a imagem
        const formData = new FormData()
        formData.append('NomeUsuario', nomeUsuario || antigoNome || '')
        formData.append('EmailUsuario', emailUsuario || antigoEmail || '')

        // Apenas adicione a imagem se ela tiver sido alterada
        if (imagemPerfil) {
          const fileInput = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement
          const file = fileInput?.files?.[0]
          if (file) {
            formData.append('ImagemUsuario', file) // Anexando o arquivo de imagem
          }
        }

        const response = await fetch(
          `http://127.0.0.1:5500/usuario/${TokenId}`,
          {
            method: 'PUT',
            body: formData, // Enviando o FormData com a imagem e outros dados
          }
        )

        if (response.ok) {
          const data = await response.json()
          // biome-ignore lint/complexity/useOptionalChain: <explanation>
          if (data && data.usuario) {
            setNomeUsuario(data.usuario.NomeUsuario)
            setImagemPerfilAntiga(data.usuario.ImagemUsuario)
            setEmailUsuario(data.usuario.EmailUsuario)
          } else {
            console.error('Dados inesperados ou incompletos na resposta:', data)
          }
        } else {
          console.error(
            'Erro ao atualizar o perfil do usuário',
            response.status
          )
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error)
      }
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemPerfil(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container-perfil">
      <h2>Nome do Usuário</h2>

      <form onSubmit={putPerfil}>
        {/* Exibe a nova imagem de perfil, se houver, ou a antiga */}
        {imagemPerfil ? (
          <img
            src={imagemPerfil}
            alt="Nova imagem de perfil"
            className="imagem-perfil"
          />
        ) : (
          imagemPerfilAntiga && (
            <img
              src={imagemPerfilAntiga}
              alt="Imagem de perfil antiga"
              className="imagem-perfil"
            />
          )
        )}

        {/* Input para escolher uma imagem */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Input para editar o nome do usuário */}
        <input
          type="text"
          placeholder={antigoNome || 'Nome do usuário'}
          value={nomeUsuario}
          onChange={e => setNomeUsuario(e.target.value)}
        />

        {/* Input para editar o email do usuário */}
        <input
          type="text"
          placeholder={antigoEmail || 'Email do usuário'}
          value={emailUsuario}
          onChange={e => setEmailUsuario(e.target.value)}
        />

        <button type="submit" className="btn">
          Deseja realizar a mudança
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            navigate('/home')
          }}
        >
          Voltar à tela principal
        </button>
      </form>
    </div>
  )
}
