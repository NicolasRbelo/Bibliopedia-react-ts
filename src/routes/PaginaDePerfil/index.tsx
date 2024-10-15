import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaginaDePerfil.css'

export const PaginaDePerfil = () => {
  const navigate = useNavigate()
  const [imagemPerfil, setImagemPerfil] = useState<string | null>(null) // Estado para armazenar a imagem
  const [nomeUsuario, setNomeUsuario] = useState<string>('') // Estado para armazenar o nome do usuário

  // Função para lidar com a seleção da imagem
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Pega o primeiro arquivo selecionado
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemPerfil(reader.result as string) // Atualiza o estado com a URL da imagem
      }
      reader.readAsDataURL(file) // Lê a imagem como URL
    }
  }

  return (
    <div className="container-perfil">
      <h2>Nome do Usuário</h2>

      {/* Exibe a imagem de perfil, se houver */}
      {imagemPerfil && (
        <img
          src={imagemPerfil}
          alt="Imagem de perfil"
          className="imagem-perfil"
        />
      )}

      {/* Input para escolher uma imagem */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* Input para editar o nome do usuário */}
      <input
        type="text"
        placeholder="Nome do usuário"
        value={nomeUsuario}
        onChange={e => setNomeUsuario(e.target.value)}
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
    </div>
  )
}
