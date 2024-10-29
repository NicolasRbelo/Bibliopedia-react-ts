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
    nome = livro.get('nome')
    SalvarLivro(InformaçõesGerais(nome))
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


    

## Usuarios

class Usuario:
    def __init__(self, Nome,Email,Senha,Imagem='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg'):
        self.nome = Nome
        self.email = Email
        self.senha = Senha
        self.imagem = Imagem
        
        

def listarTodosUsuario():    
    return make_response(
        jsonify(
            mensagem = "Listagem de user",
            usuarios = listagemTodosUsuariosService()
        )
    ) 

def salvarUsuario():    
    usuario = request.json
    DadosUsuario = Usuario(usuario.get('Nome'), usuario.get('Email'),usuario.get('Senha'))     
    verificacao = salvarUserService(DadosUsuario)
    if verificacao == ('Email já existe'):
        return  make_response(
            jsonify(
                mensagem = "Email já existe"
            )
        )
    elif verificacao == ("Campo email esta vazio"):
        return  make_response(
            jsonify(
                mensagem = "Campo email esta vazio"
            )
        )
    else:
        return  make_response(
            jsonify(
                mensagem = "Cadastro com sucesso!!"
            )
        )

def listarApenasUmUsuario(id):
    usuario = listarApenasUmUsuarioService(id)
    DadosUsuario={'idUsuario': usuario['idUsuario'], 
                  'NomeUsuario': usuario['NomeUsuario'], 
                  'EmailUsuario': usuario['EmailUsuario'], 
                  'SenhaUsuario': usuario['SenhaUsuario'], 
                  'ImagemUsuario': str(usuario['ImagemUsuario'])}       
    return make_response(
        jsonify(
            mensagem = "Listagem de user",
            usuario = DadosUsuario
        )
    ) 

def atualizarUmUsuario(id): 
    usuario = request.json
    DadosUsuario = Usuario(usuario.get('Nome'), usuario.get('Email'),usuario.get('Senha'),usuario.get('Imagem'))  
    if not isinstance(usuario.get('senha'), str):
        return make_response(
            jsonify(
              mensagem = "Senha deve ser uma string"  
            )
        )
    
    atualizarUmUsuarioService(id, DadosUsuario)          
    return make_response(
        jsonify(
            mensagem = "Usuário Atualizado com sucesso!!"
        )
    ) 

def removerUmUsuario(id):     
    removerUmUsuarioService(id)          
    return make_response(
        jsonify(
            mensagem = "Usuário Removido com sucesso!!"
        )
    )

def login():    
    usuario = request.json    
    login = loginService(usuario)
    if login:
        session.permanent = True  
        session['user_id'] = login
        session['user_name'] = listarApenasUmUsuarioService(login)['NomeUsuario']
        session['user_email'] = usuario['Email']
        return jsonify(
                sessao = {'user_id':session['user_id'],
                'user_name':session['user_name'],
                'user_email': session['user_email']},
                mensagem = "Logim feito com Sucesso",
                status = 200
            )
    
    else:
        return make_response(
            jsonify(
                mensagem = "Email ou senha invalido",
                status = 401
            )
        )

def logout():
    if 'user_id' in session:
        session.pop('user_id', None)
        session.pop('user_name', None)
        session.pop('user_email', None)
        
        return make_response(
            jsonify(
                mensagem="Logout realizado com sucesso",
                status=200
            ), 200
        )
    else:

        return make_response(
            jsonify(
                mensagem="Nenhum usuário está logado",
                status=400
            ), 400
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
    