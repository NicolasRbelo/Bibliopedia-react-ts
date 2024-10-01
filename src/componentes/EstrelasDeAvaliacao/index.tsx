import React from 'react'
import './Estrelas.css'

interface AvaliacaoSliderProps {
  rating: number
  setRating: (value: number) => void
}

const AvaliacaoSlider: React.FC<AvaliacaoSliderProps> = ({
  rating,
  setRating,
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value))
  }

  const renderStars = () => {
    const totalStars = 5
    const filledStars = Math.round(rating)

    return Array.from({ length: totalStars }, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={index < filledStars ? '#FFD700' : '#e0e0e0'} // Preenchida ou não
        width="40px"
        height="40px"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ))
  }

  return (
    <div className="slider-container">
      <label htmlFor="rating-slider" className="slider-label">
        Avalie:
      </label>
      <div className="stars-container">{renderStars()}</div>
      <input
        type="range"
        id="rating-slider"
        className="slider"
        min="1"
        max="5"
        step="0.1"
        value={rating}
        onChange={handleSliderChange}
      />
      <p className="rating-value">Sua avaliação: {rating.toFixed(1)}</p>
    </div>
  )
}

export default AvaliacaoSlider
