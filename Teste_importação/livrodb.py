from config import conexao
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date

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
        cursor.execute("SELECT EmailUsuario FROM dados.usuarios WHERE EmailUsuario = %s",(email,))
        verficacao = cursor.fetchone()
    if verficacao:
        return "Email já existe"
    elif email==(''):
        return 'Campo email esta vazio'
    else:
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
    
    cursor.close()
    connection.close()
    
    if user and check_password_hash(user['SenhaUsuario'],senha):
        return user['idUsuario']
    else:
        return False
    




def SalvarComentarios(comentario):  
    idLivro = comentario['idLivro']
    idUsuario = comentario['idUsuario']
    comentarios = comentario['comentarios']
    data = date.today()
    nota = comentario['nota']
    with conexao() as conectar:
        cursor = conectar.cursor() 
        cursor.execute(
            'INSERT INTO dados.comentarios (idLivros,idUsuario,comentario,dataComentario,nota) VALUES (%s,%s, %s,%s,%s)',
            (idLivro, idUsuario,comentarios,data,nota))
        conectar.commit()
        
def removerUmComentarios(id):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM dados.comentarios WHERE idComentarios = %s", (id,))
        conectar.commit()
        cursor.close()
        
def TodosComentarios(idLivro):
    idLivro = idLivro.get("IdLivro")
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'SELECT comentario,dataComentario FROM dados.comentarios WHERE idLivros=%s',(idLivro)
        )
        comentarios = cursor.fetchall()
        cursor.close()
    return comentarios
        
## Rating
def mediaNotas(idlivro):
    idLivro = idlivro.get("IdLivro")
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'SELECT AVG (nota) FROM dados.comentarios WHERE idLivros=%s',(idLivro)
        )
        media = cursor.fetchone()
        cursor.close()
    return media
        