import type React from 'react'
import '@fortawesome/fontawesome-free/css/all.css' // Importa o CSS do Font Awesome
import './Estrelas.css'

interface StarRatingProps {
  rating: number
  setRating: (rating: number) => void
  totalStars?: number
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  totalStars = 5,
}) => {
  const handleClick = (value: number) => {
    setRating(value)
  }

  return (
    <div className="container-estrelas">
      <div className="star-rating">
        {Array.from({ length: totalStars }, (_, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<i
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={`star fas ${index < rating ? 'fa-star' : 'fa-star-half-alt'}`}
            onClick={() => handleClick(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}

export default StarRating
