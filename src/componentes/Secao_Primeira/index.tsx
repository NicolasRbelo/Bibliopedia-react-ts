import { Swiper, SwiperSlide } from 'swiper/react'
import { PesquisarImagens } from '../BarraDePesquisa/ProcuraDeDados'
import type React from 'react'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './SecaoPrimeira.css'
import App from '../../App'

// Definindo o tipo para a imagem que será armazenada no array
interface Imagem {
  id: string
  image: string
}

// Função para criar um dicionário de imagens
const CriarDicionarioImagens = async (): Promise<Imagem[]> => {
  const ListaDeImagens = await PesquisarImagens('Harry Potter')
  const ArrayDeImagem: Imagem[] = []

  // Verifica se ListaDeImagens é realmente um array
  if (Array.isArray(ListaDeImagens)) {
    ListaDeImagens.forEach((item: string, index: number) => {
      ArrayDeImagem.push({
        id: (index + 1).toString(), // Converte o índice para string
        image: item, // Usa o URL da imagem
      })
    })
  } else {
    console.error('Erro: ListaDeImagens não é um array.', ListaDeImagens)
  }

  return ArrayDeImagem
}

// Componente Reel de imagens
const SecaodeReel: React.FC = () => {
  // Estado que armazena as imagens (array de objetos com id e image)
  const [imagens, setImagens] = useState<Imagem[]>([])

  // useEffect para buscar as imagens ao carregar o componente
  useEffect(() => {
    const fetchImages = async () => {
      const data = await CriarDicionarioImagens()
      setImagens(data)
    }

    fetchImages()
  }, [])

  return (
    <div>
      <App />
      <div className="BackGroundSection">
        <section className="container-imagem-livros">
          <Swiper
            slidesPerView={1} // Mostra 1 imagem por vez
            pagination={{ clickable: true }}
            navigation
          >
            {imagens.map(item => (
              <SwiperSlide key={item.id}>
                <img src={item.image} alt="Slider" className="slide-item" />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  )
}

export default SecaodeReel
