from flask import make_response, jsonify,request, redirect,session,url_for
import requests
from service import *

##Pesquisar dados API Google Books
def PesquisarLivros(nome):
    procura = nome
    url = f'https://www.googleapis.com/books/v1/volumes?q={procura}'
    r =  requests.get(url)
    dicionario = r.json()
    itens = dicionario['items']
    return itens

def PesquisaProfunda(urlLivro):
    url = urlLivro
    r =  requests.get(url)
    dicionario = r.json()
    return dicionario
    
def PesquisarAutor(nome):
    resultados =  PesquisarLivros(nome)
    autores = []
    i = resultados[0]['volumeInfo']['authors']
    if len(i) == 1:
        return  i 
    else:
        for e in i:
            autores.append(e)
    return autores
    
def PesquisarNomes(nome):
    resultados = PesquisarLivros(nome)
    ListadeLivros=[]
    for i in range (len(resultados)):
        nomes = resultados[i]['volumeInfo']['title']
        ListadeLivros.append(nomes)
    return ListadeLivros

def PesquisarGenero(nome):
    listaGeneros = []
    resultados = PesquisarLivros(nome)
    i = resultados[0]['selfLink']
    infomar = PesquisaProfunda(i)
    seila = infomar['volumeInfo']['categories']
    for e in seila:
        if e.split('/') == 3:
            a,b,c = e.split('/')
            a = a.strip()
            b = b.strip()
            c = c.strip()
            if (a in listaGeneros) == False:
                listaGeneros.append(a)
            if (b in listaGeneros) == False:
                listaGeneros.append(b)
            if (c in listaGeneros) == False:
                listaGeneros.append(c)
        elif e.split('/') == 3:
            a,b = e.split('/')
            a = a.strip()
            b = b.strip()
            if (a in listaGeneros) == False:
                listaGeneros.append(a)
            if (b in listaGeneros) == False:
                listaGeneros.append(b)
            if (c in listaGeneros) == False:
                listaGeneros.append(c)
        else:
            c = e
            if (c in listaGeneros) == False:
                listaGeneros.append(c)

    return listaGeneros
    
def PesquisarNome(nome):
    resultados = PesquisarLivros(nome)
    nome = resultados[0]['volumeInfo']['title']
    return nome
    
def PesquisarImagens(nome):
    ListadeImagens=[]
    for e in nome:
        resultados = PesquisarLivros(e)
        for i in range (len(resultados)):
            try:
                imagens = resultados[i]['volumeInfo']['imageLinks']['thumbnail']
                ListadeImagens.append(imagens)
            except:
                imagens = FileNotFoundError
                break
    return ListadeImagens

def PesquisarImagem(nome):
    resultado = PesquisarLivros(nome)
    try:
        imagem = resultado[0]['volumeInfo']['imageLinks']['thumbnail']
    except:
        imagem = FileNotFoundError
    return imagem

def PesquisarDescricao(nome):
    resultados = PesquisarLivros(nome)
    try:
        descricao = resultados[0]['volumeInfo']['description']
    except:
        descricao = FileNotFoundError
    return descricao

def PesquisarId(nome):
    resultados = PesquisarLivros(nome)
    descricao = resultados[0]['id']
    return descricao

def InformaçõesGerais(nome):
    dicionario = {"Id":PesquisarId(nome),
                  "Nome":PesquisarNome(nome),
                  "Imagem":PesquisarImagem(nome),
                  "Descricao":PesquisarDescricao(nome),
                  "Genero":PesquisarGenero(nome),
                  "Autor":PesquisarAutor(nome)}
    return dicionario

def LivroFavorito(nome, idUsuario):
    dicionario = {"Id":PesquisarId(nome),
                  "Nome":PesquisarNome(nome),
                  "Imagem":PesquisarImagem(nome),
                  "Descricao":PesquisarDescricao(nome),
                  "Genero":PesquisarGenero(nome),
                  "Autor":PesquisarAutor(nome),
                  "IdUsuario": idUsuario}
    return dicionario
    

## Livros

def TodosLivros(idUsuario):
    return make_response(
        jsonify(
            mensagem = 'Lista de livros',
            livros = ListagemTodosLivros(idUsuario)
        )
    )
    
def SalveLivro():
    livro = request.json
    nome = livro.get('Nome')
    idUsuario = livro.get('IdUsuario')
    SalvarLivro(LivroFavorito(nome, idUsuario))
    return make_response(
        jsonify(
            Mensagem = "Livro salvo"
        )
    )
    
def ListadeLivros(pesquisa):
    livros = PesquisarNomes(pesquisa)
    resposta = {}
    for i in livros:
        resposta[i] = InformaçõesGerais(i)
    return resposta
def DeletarLivro(idLivro):
    livro = request.json
    dicionario_dados = {'idUsuario' : livro.get('idUser'),
                        'idLivro' : idLivro
                        }
    DeletaLivroDB(dicionario_dados)
    return make_response(
        jsonify(
            mensagem = 'Livro excluido'
        )
    )



    


    
##Comentario

def salvarComentario():    
    comentario = request.json 
    comentarioCorrigido = {'idLivro': PesquisarId(comentario.get("LivroId")),
                            'idUsuario' : comentario.get('userId'),
                            'comentarios' : comentario.get('comentario'),
                            'nota':comentario.get('rating')}
    SalvarComentario(comentarioCorrigido)
    return make_response(
        jsonify(
            mensagem = "Comentario registrado"
        )
    )
    
def Vercomentarios(idLivro):
    idLivroCorrido = PesquisarId(idLivro)
    return Comentarios(idLivroCorrido)
    
##Rating
def notaLivro(idLivro):
    notaMedia = ServiceMediaNotas(idLivro)
    return make_response(
        jsonify(
            mensagem = "Nota do livro",
            nota = notaMedia
        )
    )
    