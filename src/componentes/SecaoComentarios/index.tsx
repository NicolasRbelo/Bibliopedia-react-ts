import type React from 'react'
import { useState, type ChangeEvent, useEffect } from 'react'
import './SecaoComentario.css'
import StarRating from '../EstrelasDeAvaliacao'
import { ListaComentario } from '../ListaComentarios'

interface SecaoComentariosProps {
  LivroId: string
}

const SecaoComentarios: React.FC<SecaoComentariosProps> = ({ LivroId }) => {
  const [comentario, setComentario] = useState<string>('')
  const [rating, setRating] = useState<number>(3)
  const [userId, setUserId] = useState<number | null>(null)
  const [refreshComments, setRefreshComments] = useState<boolean>(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('user_token')
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken)
      setUserId(parsedToken)
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(event.target.value)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const comentarioData = {
      LivroId,
      comentario,
      rating,
      ...(userId && { userId }),
    }

    console.log('Enviando comentário:', comentarioData)

    try {
      const response = await fetch('http://127.0.0.1:5500/comentario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comentarioData),
      })

      if (response.ok) {
        console.log('Comentário enviado com sucesso!')
        setComentario('')
        setRefreshComments(prev => !prev)
      } else {
        console.error('Erro ao enviar o comentário', response.status)
      }
    } catch (error) {
      console.error('Erro ao enviar o comentário', error)
    }
  }

  return (
    <section className="container-comentario">
      <form onSubmit={handleSubmit} className="form-comentario">
        <textarea
          className="comentarios"
          value={comentario}
          onChange={handleInputChange}
          placeholder="Digite seu comentário..."
          required
        />
        {/* Substituímos AvaliacaoSlider por StarRating */}
        <StarRating rating={rating} setRating={setRating} />
        <button className="btn-submit" type="submit">
          Comentar
        </button>
      </form>
      <ListaComentario LivroId={LivroId} refresh={refreshComments} />
    </section>
  )
}

export default SecaoComentarios
