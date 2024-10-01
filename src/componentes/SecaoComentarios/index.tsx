import type React from 'react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import './SecaoComentario.css'
import AvaliacaoSlider from '../EstrelasDeAvaliacao'

interface SecaoComentariosProps {
  LivroId: string
}

const SecaoComentarios: React.FC<SecaoComentariosProps> = ({ LivroId }) => {
  const [comentario, setComentario] = useState<string>('')
  const [rating, setRating] = useState<number>(3) // Valor padrão do rating

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Enviando comentário:', { LivroId, comentario, rating })

    try {
      const response = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LivroId,
          comentario,
          rating,
        }),
      })

      if (response.ok) {
        console.log('Comentário enviado com sucesso!')
        setComentario('') // Limpa o campo de comentários após o envio
      } else {
        console.error('Erro ao enviar o comentário', response.status)
      }
    } catch (error) {
      console.error('Erro ao enviar o comentário', error)
    }
  }

  return (
    <section className="container-comentario">
      <form onSubmit={handleSubmit}>
        {/* Avaliação por Slider - Passa o estado do rating e o setter */}
        <AvaliacaoSlider rating={rating} setRating={setRating} />
        <textarea
          className="comentarios"
          value={comentario}
          onChange={handleInputChange}
          placeholder="Digite seu comentário..."
          required
        />
        <button className="btn-submit" type="submit">
          Comentar
        </button>
      </form>
    </section>
  )
}

export default SecaoComentarios
