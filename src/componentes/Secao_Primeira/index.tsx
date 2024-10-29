import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules' // Inclua o EffectCoverflow

import { PesquisarImagens } from '../BarraDePesquisa/ProcuraDeDados'
import type React from 'react'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './SecaoPrimeira.css'
import App from '../../App'

interface Imagem {
  id: string
  image: string
}

const CriarDicionarioImagens = async (): Promise<Imagem[]> => {
  const ListaDeImagens = await PesquisarImagens('Harry Potter')
  const ArrayDeImagem: Imagem[] = []

  if (Array.isArray(ListaDeImagens)) {
    ListaDeImagens.forEach((item: string, index: number) => {
      ArrayDeImagem.push({
        id: (index + 1).toString(),
        image: item || 'URL_DA_IMAGEM_FALLBACK', // Fallback para imagem
      })
    })
  } else {
    console.error('Erro: ListaDeImagens não é um array.', ListaDeImagens)
  }

  return ArrayDeImagem
}

const SecaodeReel: React.FC = () => {
  const [imagens, setImagens] = useState<Imagem[]>([])

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
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]} // Adiciona EffectCoverflow
            slidesPerView={3} // Ajuste para mostrar mais de um slide por vez
            spaceBetween={30} // Espaço entre os slides
            effect="coverflow"
            navigation
            autoplay={{ delay: 3000 }}
            loop={true}
            coverflowEffect={{
              rotate: 50, // Rotação dos slides
              stretch: 0, // Estiramento dos slides
              depth: 100, // Profundidade do efeito
              modifier: 1, // Modificador de efeito
              slideShadows: true, // Adiciona sombras aos slides
            }}
          >
            {imagens.map(item => (
              <SwiperSlide key={item.id}>
                <img
                  src={item.image || 'URL_DA_IMAGEM_FALLBACK'}
                  alt="Slider"
                  className="slide-item"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  )
}

export default SecaodeReel
