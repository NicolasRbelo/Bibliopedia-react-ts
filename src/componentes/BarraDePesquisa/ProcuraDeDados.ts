import axios from 'axios'

// Tipos
interface VolumeInfo {
  publishedDate: string
  pageCount: number
  averageRating: number
  title: string
  authors?: string[]
  imageLinks?: {
    smallThumbnail?: string
    thumbnail?: string // Adiciona o tipo `thumbnail`
  }
  description?: string
}

interface GoogleBooksResponse {
  items: Item[]
}

interface Item {
  volumeInfo: VolumeInfo
}

interface LivroDetalhado {
  titulo: string
  autores: string
  imagem: string
  dataPublicacao: string
  paginas: number
}

// Funções de busca
export async function PesquisarLivros(nome: string): Promise<Item[]> {
  const procura = nome
  const url = `https://www.googleapis.com/books/v1/volumes?q=${procura}`
  try {
    const response = await axios.get<GoogleBooksResponse>(url)
    const dicionario = response.data
    const itens = dicionario.items || [] // Verificação adicionada
    return itens
  } catch (error) {
    console.error(error)
    return [] // Retorna um array vazio em caso de erro
  }
}

export async function PesquisarNomes(nome: string): Promise<string[]> {
  const resultados = await PesquisarLivros(nome)
  const ListadeLivros: string[] = []
  if (resultados.length) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    resultados.forEach(item => {
      const nomes = item.volumeInfo.title
      ListadeLivros.push(nomes)
    })
  }
  return ListadeLivros
}

export async function PesquisarNome(nome: string): Promise<string> {
  const resultados = await PesquisarLivros(nome)
  if (resultados.length > 0) {
    const nomeLivro = resultados[0].volumeInfo.title
    return nomeLivro
  }
  return '' // Retorna uma string vazia caso não haja resultados
}

export async function PesquisarImagens(nome: string): Promise<string[]> {
  const resultados = await PesquisarLivros(nome)
  const ListadeImagens: string[] = []
  if (resultados.length) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    resultados.forEach(item => {
      try {
        const imagens =
          item.volumeInfo.imageLinks?.thumbnail || 'FileNotFoundError' // Agora verifica corretamente `thumbnail`
        ListadeImagens.push(imagens)
      } catch (error) {
        ListadeImagens.push('FileNotFoundError')
      }
    })
  }
  return ListadeImagens
}

export async function PesquisarImagem(nome: string): Promise<string> {
  const resultado = await PesquisarLivros(nome)
  if (resultado.length > 0) {
    const imagem =
      resultado[0].volumeInfo.imageLinks?.thumbnail || 'FileNotFoundError'
    return imagem
  }
  return 'FileNotFoundError'
}

export async function PesquisarDescricao(nome: string): Promise<string> {
  const resultados = await PesquisarLivros(nome)
  if (resultados.length > 0) {
    const descricao =
      resultados[0].volumeInfo.description || 'Descrição não disponível'
    return descricao
  }
  return 'Descrição não disponível'
}

export async function InformacoesGerais(
  nome: string
): Promise<{ Nome: string; imagem: string; Descricao: string }> {
  const dicionario = {
    Nome: await PesquisarNome(nome),
    imagem: await PesquisarImagem(nome),
    Descricao: await PesquisarDescricao(nome),
  }
  console.log(dicionario)
  return dicionario
}

export async function DadosLivrosDetalhados(
  nome: string
): Promise<LivroDetalhado[]> {
  const resultados = await PesquisarLivros(nome)
  const listaDeLivros: LivroDetalhado[] = []

  if (resultados.length) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    resultados.forEach(item => {
      const titulo = item.volumeInfo.title
      const autores =
        item.volumeInfo.authors?.join(', ') || 'Autor Desconhecido'
      const imagem =
        item.volumeInfo.imageLinks?.thumbnail || 'Imagem não disponível'
      const dataPublicacao =
        item.volumeInfo.publishedDate || 'Data não disponível'
      const paginas = item.volumeInfo.pageCount || 0

      listaDeLivros.push({
        titulo,
        autores,
        imagem,
        dataPublicacao,
        paginas,
      })
    })
  }

  return listaDeLivros
}
