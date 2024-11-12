from config import conexao
from werkzeug.security import generate_password_hash, check_password_hash


def listagemTodosUsuariosdb():
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute('SELECT * FROM dados.usuarios')
        usuarios = cursor.fetchall()
    return usuarios

def salvarUsuariodb(usuario):
    username = usuario.nome    
    email = usuario.email
    senhaHashed = generate_password_hash(usuario.senha, method='pbkdf2:sha256')
    Imagem = usuario.imagem
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
                'INSERT INTO dados.usuarios (NomeUsuario, EmailUsuario, SenhaUsuario,ImagemUsuario) VALUES (%s,%s, %s,%s)',
                (username, email, senhaHashed,Imagem))
            conectar.commit()
    


def listarApenasUmUsuariodb(id):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)    
        cursor.execute("SELECT * FROM dados.usuarios WHERE idUsuario = %s", (id,))
        user = cursor.fetchone()
    return user         

def atualizarUmUsuariodb(id, usuario):
    username = usuario.nome    
    email = usuario.email
    senhaHashed = generate_password_hash(usuario.senha, method='pbkdf2:sha256')
    Imagem = usuario.imagem

    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("UPDATE dados.usuarios SET NomeUsuario  = %s EmailUsuario = %s, SenhaUsuario = %s, ImagemUsuario = %s  WHERE idUsuario = %s", 
                       (username, email, senhaHashed,Imagem,id))
        conectar.commit()
        cursor.close()

def removerUmUsuariodb(id):
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM dados.usuarios WHERE idUsuario = %s", (id,))
        conectar.commit()
        cursor.close()

def logindb(usuario):
    
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