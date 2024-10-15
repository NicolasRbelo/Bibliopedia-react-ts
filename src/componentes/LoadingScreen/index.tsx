// LoadingScreen.tsx

import type React from 'react'
import './TelaDeCarregamento.css'

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <div className="spinner"></div>
      <h2 className="loading-text">Carregando...</h2>
    </div>
  )
}

export default LoadingScreen
