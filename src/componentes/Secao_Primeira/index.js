import { Swiper, SwiperSlide } from "swiper/react";
import { PesquisarImagens } from "../BarraDePesquisa/ProcuraDeDados";
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./SecaoPrimeira.css";


const CriarDicionarioImagens = async () => {
    let ListaDeImagens = await PesquisarImagens('Harry Potter');
    const ArrayDeImagem = [];

    // Verifica se ListaDeImagens é realmente um array
    if (Array.isArray(ListaDeImagens)) {
        ListaDeImagens.forEach((item, index) => {
            ArrayDeImagem.push({
                id: (index + 1).toString(),  // Converte o índice para string
                image: item                  // Usa o URL da imagem
            });
        });
    } else {
        console.error("Erro: ListaDeImagens não é um array.", ListaDeImagens);
    }

    return ArrayDeImagem;
};


const SecaodeReel = () => {
    const [imagens, setImagens] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const data = await CriarDicionarioImagens();
            setImagens(data);
        };

        fetchImages();
    }, []);

    return (
        <div className="BackGroundSection">
        <section className="container-imagem-livros">
            <Swiper
                slidesPerView={1}  // Mostra 3 imagens por vez
                pagination={{ clickable: true }}
                navigation
            >
                {imagens.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img 
                            src={item.image}
                            alt="Slider"
                            className="slide-item"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
        </div>
    );
};

export default SecaodeReel;