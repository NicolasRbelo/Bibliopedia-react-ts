import type React from 'react'
import {
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import './BarradePesquisa.css'
import { DadosLivrosDetalhados } from './ProcuraDeDados.js'

interface LivroDetalhado {
  titulo: string
  autores: string
  imagem: string
}

const BarradePesquisa: React.FC = () => {
  const [suggestions, setSuggestions] = useState<LivroDetalhado[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const debounceTimeout = useRef<number | null>(null)
  const cache = useRef<{ [key: string]: LivroDetalhado[] }>({})
  const navigate = useNavigate() // Hook para navegação

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    if (value.trim().length < 3) {
      setSuggestions([])
      return
    }

    if (cache.current[value]) {
      setSuggestions(cache.current[value])
      return
    }

    debounceTimeout.current = window.setTimeout(async () => {
      try {
        const livros = await DadosLivrosDetalhados(value)
        setSuggestions(livros)
        cache.current[value] = livros
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error)
        setSuggestions([])
      }
    }, 300)
  }

  const handleSuggestionClick = (titulo: string) => {
    setInputValue(titulo)
    setSuggestions([])
    navigate(`/livro/${encodeURIComponent(titulo)}`) // Navegação para a página do livro
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (inputValue.trim()) {
        navigate(`/explorar?query=${encodeURIComponent(inputValue)}`) // Navegação para a página de exploração
      }
    }
  }
  

  return (
    <div className="Search">
      <input
        type="search"
        id="CampoDeBusca"
        placeholder="Busca..."
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && (
        <ul className="list">
          {suggestions.map((livro, index) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index} onClick={() => handleSuggestionClick(livro.titulo)}>
              <img src={livro.imagem} alt={livro.titulo} width="50" />
              <div>
                <strong>{livro.titulo}</strong>
                <p>Autor: {livro.autores}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BarradePesquisa
