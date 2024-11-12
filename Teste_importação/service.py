from livrodb import *
from userdb import *


def ListagemTodosLivros(idUsuario):
    return Livrosdb(idUsuario)

def Umlivro(nome):
    return ApenasUmLivro(nome)

def SalvarLivro(dado):
    return AdicionarLivro(dado)

def RemoverUm(idLivro):
    return RemoverUmLivro(idLivro)

## Usuarios

def listagemTodosUsuariosService():    
    return listagemTodosUsuariosdb()

def salvarUserService(usuario):    
    return salvarUsuariodb(usuario)   

def listarApenasUmUsuarioService(id):    
    return listarApenasUmUsuariodb(id) 

def atualizarUmUsuarioService(id, usuario):
    return atualizarUmUsuariodb(id, usuario) 

def removerUmUsuarioService(id):
    return removerUmUsuariodb(id) 

def loginService(usuario):
    return logindb(usuario) 

##Comentario

def SalvarComentario(comentario):    
    return SalvarComentarios(comentario)   

def ServiceMediaNotas(idlivro):
    return mediaNotas(idlivro)

def Comentarios(idLivro):
    return TodosComentarios(idLivro)