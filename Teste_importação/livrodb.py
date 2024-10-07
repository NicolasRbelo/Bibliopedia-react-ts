from config import conexao
from werkzeug.security import generate_password_hash, check_password_hash


## Manuseio do banco de livros
def AdicionarLivro(dados):
    idLivro = dados['Id']
    nomeLivro = dados['Nome']
    generoLivro = str(dados['Genero'])
    autorlivro = str(dados['Autor'])
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'INSERT INTO dados.livros (idAPI, livrosnome, livrosgenero,livrosautor) VALUES (%s, %s, %s,%s)',
            (idLivro, nomeLivro,generoLivro,autorlivro )
        )
        conectar.commit()
        
def ApenasUmLivro(id):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM dados.livros WHERE idAPI = %s", (id,)
            )
        livro = cursor.fetchone()
        return livro

def RemoverUmLivro(id):
        with conexao() as conectar:
            cursor = conectar.cursor()
            cursor.execute(
                    "DELETE FROM dados.livros WHERE idlivros = %s", (id,)
                    )
            conectar.commit()


def Livrosdb():
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
         "SELECT livrosnome FROM dados.livros"
        )
        livros = cursor.fetchone()
    return livros



## Manuseio do banco de Usuario




def listagemTodosUsuarios():
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute('SELECT * FROM dados.usuarios')
        usuarios = cursor.fetchall()
    return usuarios

def salvarUsuario(usuario):
    username = usuario.get('Nome')    
    email = usuario.get('Email')
    senhaHashed = generate_password_hash(usuario.get('Senha'), method='pbkdf2:sha256')
    with conexao() as conectar:
        cursor = conectar.cursor() 
        cursor.execute(
            'INSERT INTO dados.usuarios (NomeUsuario, EmailUsuario, SenhaUsuario) VALUES (%s,%s, %s)',
            (username, email, senhaHashed))
        conectar.commit()
    


def listarApenasUmUsuario(id):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)    
        cursor.execute("SELECT * FROM dados.usuarios WHERE idUsuario = %s", (id,))
        user = cursor.fetchone()
    return user         

def atualizarUmUsuario(id, usuario):
    username = usuario.get('Nome')  
    email = usuario.get('Email')
    senhaHashed = generate_password_hash(usuario.get('Senha'), method='pbkdf2:sha256')

    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("UPDATE dados.usuarios SET NomeUsuario  = %s EmailUsuario = %s, SenhaUsuario = %s  WHERE idUsuario = %s", 
                       (username, email, senhaHashed,id))
        conectar.commit()
        cursor.close()

def removerUmUsuario(id):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM dados.usuarios WHERE idUsuario = %s", (id,))
        conectar.commit()
        cursor.close()



def login(usuario):
    
    email = usuario.get('Email')
    senha = usuario.get('Senha')
    
    connection = conexao()
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM dados.usuarios WHERE EmailUsuario = %s", (email,))
    user = cursor.fetchone()
    
    
    if user and check_password_hash(user['SenhaUsuario'],senha):
        cursor.close()
        connection.close()
        return user['idUsuario']
    else:
        cursor.close()
        connection.close()
        return False
    



## Manuseio do banco de Comentarios

def SalvarComentarios(comentario):  
    idLivro = comentario.get("idLivro")
    idUsuario = comentario.get('Id')
    comentarios = comentario.get('Comemtario')
    with conexao() as conectar:
        cursor = conectar.cursor() 
        cursor.execute(
            'INSERT INTO dados.cometarios (idLivros,idUsuario,comentario) VALUES (%s,%s, %s)',
            (idLivro, idUsuario,comentarios))
        conectar.commit()
        
def removerUmComentarios(id):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM dados.comentarios WHERE idComentarios = %s", (id,))
        conectar.commit()
        cursor.close()
        
