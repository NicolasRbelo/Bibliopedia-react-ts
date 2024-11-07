import type React from 'react'
import { useEffect, useState } from 'react'
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
}

export const ListaComentario: React.FC<ListaComentarioProps> = ({
  LivroId,
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([])

  // Função para buscar os comentários do banco de dados
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        PesquisarLivros
        const response = await fetch(
          `http://127.0.0.1:5500/comentarios/${LivroId}`
        )
        if (response.ok) {
          const data = await response.json()
          setComentarios(data)
          console.log(data)
          console.log(comentarios)
        } else {
          console.error('Erro ao buscar os comentários:', response.status)
        }
      } catch (error) {
        console.error('Erro ao buscar os comentários:', error)
      }
    }

    fetchComentarios()
  }, [LivroId]) // Reexecuta quando o `LivroId` muda

  return (
    <div className="lista-comentarios">
      {comentarios.length > 0 ? (
        comentarios.map(comentario => (
          <div key={comentario.Username} className="lista-comentario">
            <p className="username">
              <strong>{comentario.Username}:</strong>
            </p>
            <p className="user-comentario">{comentario.Comentario}</p>
            <div className="estrelas-usuarios">
              <StarRating rating={comentario.Rating} setRating={() => {}} />{' '}
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
