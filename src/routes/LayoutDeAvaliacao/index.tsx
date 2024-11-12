import './LayoutAvaliacao.css'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InformacoesGerais } from '../../componentes/BarraDePesquisa/ProcuraDeDados' // Atualize o caminho se necessário
import SecaoComentarios from '../../componentes/SecaoComentarios'
import LoadingScreen from '../../componentes/LoadingScreen'

interface Informacoes {
  Nome: string
  imagem: string
  Descricao: string
}

const LayoutAvaliacao: React.FC = () => {
  const { livroId } = useParams<{ livroId: string }>() // Tipagem para o parâmetro da rota
  const [informacoes, setInformacoes] = useState<Informacoes | null>(null)
  const isAuthenticated = !!localStorage.getItem('user_token')

  useEffect(() => {
    const fetchInformacoes = async () => {
      if (livroId) {
        try {
          const dados = await InformacoesGerais(livroId)
          setInformacoes(dados)
        } catch (error) {
          console.error('Erro ao buscar informações:', error)
        }
      }
    }

    fetchInformacoes()
  }, [livroId])
  const handleOnclick = async () => {
    if (!informacoes) return

    const livroData = {
      Nome: informacoes.Nome,
      imagem: informacoes.imagem,
      Descricao: informacoes.Descricao,
      IdUsuario: localStorage.getItem('user_token'),
    }

    try {
      const response = await fetch('http://127.0.0.1:5500/livro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroData),
      })

      if (response.ok) {
        console.log('Livro adicionado à biblioteca com sucesso!')
      } else {
        console.error(
          'Erro ao adicionar o livro à biblioteca:',
          response.status
        )
      }
    } catch (error) {
      console.error('Erro ao adicionar o livro à biblioteca:', error)
    }
  }
  return (
    <div className="Pagina">
      {informacoes ? (
        <>
          <section className="section-container">
            <div className="container-livro">
              <cite className="titulo">{informacoes.Nome}</cite>
              <img src={informacoes.imagem} alt={informacoes.Nome} />
              <button type="button" onClick={handleOnclick}>
                Colocar o livro na biblioteca
              </button>
            </div>
            <div className="container-sinopse">
              <p className="sinopse">{informacoes.Descricao}</p>
            </div>
          </section>
          {isAuthenticated ? <SecaoComentarios LivroId={livroId!} /> : null}
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  )
}

export default LayoutAvaliacao
