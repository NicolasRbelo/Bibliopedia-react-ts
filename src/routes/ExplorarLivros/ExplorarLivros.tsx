import type React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DadosLivrosDetalhados } from '../../componentes/BarraDePesquisa/ProcuraDeDados'
import './ExplorarLivro.css'

interface LivroDetalhado {
  titulo: string
  autores: string
  imagem: string
  dataPublicacao: string
  paginas: number
}

const ExplorarLivros: React.FC = () => {
  const [livros, setLivros] = useState<LivroDetalhado[]>([])
  const [filtro, setFiltro] = useState<'titulo' | 'autor'>('titulo')
  const [inputValue, setInputValue] = useState<string>('')

  const location = useLocation()
  const navigate = useNavigate()

  // Extrair o termo de busca da URL
  const searchQuery = new URLSearchParams(location.search).get('query')

  useEffect(() => {
    const buscarLivros = async () => {
      if (searchQuery) {
        try {
          const resultados = await DadosLivrosDetalhados(searchQuery)
          setLivros(resultados)
        } catch (error) {
          console.error('Erro ao buscar livros:', error)
        }
      }
    }

    buscarLivros()
  }, [searchQuery])

  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltro(event.target.value as 'titulo' | 'autor')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSearch = async () => {
    if (inputValue.trim()) {
      try {
        const resultados = await DadosLivrosDetalhados(inputValue)
        const livrosFiltrados = resultados.filter(
          (livro: { titulo: string; autores: string }) =>
            filtro === 'titulo'
              ? livro.titulo.toLowerCase().includes(inputValue.toLowerCase())
              : livro.autores.toLowerCase().includes(inputValue.toLowerCase())
        )
        setLivros(livrosFiltrados)
      } catch (error) {
        console.error('Erro ao buscar livros filtrados:', error)
      }
    }
  }

  return (
    <div className="explorar-livros">
      <h1>Explorar Livros</h1>
      <div className="filtros">
        <input
          type="text"
          placeholder={`Buscar por ${filtro}`}
          value={inputValue}
          onChange={handleInputChange}
        />
        <select value={filtro} onChange={handleFiltroChange}>
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
        </select>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <ul className="lista-livros">
        {livros.map((livro, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
          >
            <img src={livro.imagem} alt={livro.titulo} width="50" />
            <div>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <strong
                onClick={() =>
                  navigate(`/livro/${encodeURIComponent(livro.titulo)}`)
                }
              >
                {livro.titulo}
              </strong>
              <p>Autor: {livro.autores}</p>
              <p>
                Data de Publicação: {livro.dataPublicacao || 'Indisponível'} /
                Páginas: {livro.paginas || 'Indisponível'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExplorarLivros
