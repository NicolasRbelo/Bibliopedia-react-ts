import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import StarRating from '../EstrelasDeAvaliacao'
import './ListaComentaios.css'
import { PesquisarLivros } from '../BarraDePesquisa/ProcuraDeDados'

interface Comentario {
  Comentario: string
  Date: string
  Rating: number
  Username: string
}

interface ListaComentarioProps {
  LivroId: string
  refresh: boolean
}

export const ListaComentario: React.FC<ListaComentarioProps> = ({
  LivroId,
  refresh,
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const debouceTimeout = useRef<number | null>(null)

  // Função para buscar os comentários do banco de dados
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchComentarios = async () => {
      setLoading(true)
      try {
        PesquisarLivros
        const response = await fetch(
          `http://127.0.0.1:5500/comentarios/${LivroId}`
        )
        if (response.ok) {
          const data = await response.json()
          setComentarios(data)
        } else {
          console.error('Erro ao buscar os comentários:', response.status)
        }
      } catch (error) {
        console.error('Erro ao buscar os comentários:', error)
      } finally {
        debouceTimeout.current = window.setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    fetchComentarios()
  }, [LivroId, refresh]) // Reexecuta quando o `LivroId` muda

  return (
    <div className="lista-comentarios">
      {loading ? (
        <p>Carregando comentários...</p>
      ) : comentarios.length > 0 ? (
        comentarios.map(comentario => (
          <div key={comentario.Username} className="lista-comentario">
            <p className="username">
              <strong>{comentario.Username}:</strong>
            </p>
            <p className="user-comentario">{comentario.Comentario}</p>
            <div className="estrelas-usuarios">
              <StarRating rating={comentario.Rating} setRating={() => {}} />
              <p>{comentario.Rating}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum comentário disponível ainda.</p>
      )}
    </div>
  )
}
