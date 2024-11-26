import { useEffect, useState } from 'react'
import './Biblioteca.css'
import { useNavigate } from 'react-router-dom'
import { PesquisarImagem } from '../../componentes/BarraDePesquisa/ProcuraDeDados'

interface Livros {
  idlivros: number
  idAPI: string
  livrosnome: string
  livrosgenero: string
  livrosautor: string
  livrosnota: number | null
}

const DEFAULT_IMAGE = '/path/to/default-image.jpg'

export const Biblioteca = () => {
  const [favoritos, setFavoritos] = useState<Livros[]>([])
  const [capas, setCapas] = useState<{ [id: number]: string }>({})
  const [removendo, setRemovendo] = useState<number | null>(null)
  const token = localStorage.getItem('user_token')
  const navigate = useNavigate()

  const getFavoritos = async () => {
    if (!token) {
      console.error('Usuário não autenticado.')
      navigate('/login')
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:5500/livros/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setFavoritos(data.livros)
        console.log

        const imagens = await Promise.all(
          data.livros.map(async (livro: Livros) => {
            const capa = await PesquisarImagem(livro.livrosnome)
            return { id: livro.idlivros, capa }
          })
        )
        setCapas(
          imagens.reduce((acc, img) => ({ ...acc, [img.id]: img.capa }), {})
        )
      } else {
        console.error('Erro ao obter os livros favoritos:', response.status)
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  const handleRemove = async (idLivro: number) => {
    setRemovendo(idLivro)
    const idUser = localStorage.getItem('user_token')
    try {
      const response = await fetch(`http://127.0.0.1:5500/livro/${idLivro}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUser, idLivro }),
      })

      if (response.ok) {
        setFavoritos(prevFavoritos =>
          prevFavoritos.filter(livro => livro.idlivros !== idLivro)
        )
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição de remoção:', error)
    } finally {
      setRemovendo(null)
    }
  }

  useEffect(() => {
    getFavoritos()
  }, [token])

  return (
    <div className="container-biblioteca">
      <h1>Minha Biblioteca</h1>
      <button type="button" onClick={() => navigate('/home')}>
        Voltar para a página principal
      </button>
      <div className="container-livros">
        {favoritos.length > 0 ? (
          favoritos.map(livro => (
            <div key={livro.idlivros} className="livro">
              <img
                src={capas[livro.idlivros] || DEFAULT_IMAGE}
                alt={`Capa do livro ${livro.livrosnome}`}
              />
              <div className="informacoes">
                <h2>{livro.livrosnome}</h2>
                <p>
                  <strong>Autor:</strong> {livro.livrosautor}
                </p>
                <p>
                  <strong>Gênero:</strong> {livro.livrosgenero}
                </p>
                {livro.livrosnota !== null && (
                  <p>
                    <strong>Nota:</strong> {livro.livrosnota}
                  </p>
                )}
              </div>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                className="btn-remover"
                disabled={removendo === livro.idlivros}
                onClick={() => handleRemove(livro.idlivros)}
              >
                {removendo === livro.idlivros ? 'Removendo...' : 'Remover'}
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado em sua biblioteca.</p>
        )}
      </div>
    </div>
  )
}
