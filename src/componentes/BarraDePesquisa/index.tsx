import type React from 'react'
import { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './BarradePesquisa.css'
import { PesquisarNomes } from './ProcuraDeDados.js'

const BarradePesquisa: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const debounceTimeout = useRef<number | null>(null)
  const cache = useRef<{ [key: string]: string[] }>({})

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
        const nomes = await PesquisarNomes(value)
        setSuggestions(nomes)
        cache.current[value] = nomes
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error)
        setSuggestions([])
      }
    }, 300)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setSuggestions([])
    navigate(`/livro/${encodeURIComponent(suggestion)}`) // Navegação para a página do livro
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (inputValue.trim()) {
        navigate(`/livro/${encodeURIComponent(inputValue)}`) // Navegação ao pressionar Enter
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
          {suggestions.map((suggestion, index) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BarradePesquisa
