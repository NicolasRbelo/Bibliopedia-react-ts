from livrodb import *


def ListagemTodosLivros(idUsuario):
    return Livrosdb(idUsuario)

def Umlivro(nome):
    return ApenasUmLivro(nome)

def SalvarLivro(dado):
    return AdicionarLivro(dado)

def RemoverUm(id):
    return RemoverUmLivro(id)

## Usuarios

def listagemTodosUsuariosService():    
    return listagemTodosUsuarios()

def salvarUserService(usuario):    
    return salvarUsuario(usuario)   

def listarApenasUmUsuarioService(id):    
    return listarApenasUmUsuario(id) 

def atualizarUmUsuarioService(id, usuario):
    return atualizarUmUsuario(id, usuario) 

def removerUmUsuarioService(id):
    return removerUmUsuario(id) 

def loginService(usuario):
    return login(usuario) 

##Comentario

def SalvarComentario(comentario):    
    return SalvarComentarios(comentario)   

def ServiceMediaNotas(idlivro):
    return mediaNotas(idlivro)

def Comentarios(idLivro):
    return TodosComentarios(idLivro)