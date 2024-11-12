from config import conexao
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date

## Manuseio do banco de livros
def AdicionarLivro(dados):
    idLivro = dados['Id']
    idUsuario = dados["IdUsuario"]
    nomeLivro = dados['Nome']
    generoLivro = str(dados['Genero'])
    autorlivro = str(dados['Autor'])
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'INSERT INTO dados.livros (idAPI, livrosnome, livrosgenero,livrosautor,idUsuario) VALUES (%s, %s, %s,%s,%s)',
            (idLivro, nomeLivro,generoLivro,autorlivro,idUsuario )
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


def Livrosdb(idUsuario):
    with conexao() as conectar:
        cursor = conectar.cursor(dictionary=True)
        cursor.execute(
         "SELECT livrosnome FROM dados.livros WHERE idUsuario=%s",(idUsuario,)
        )
        livros = cursor.fetchall()
    return livros



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
    with conexao() as conectar:
        cursor = conectar.cursor()
        cursor.execute(
            'SELECT usuarios.NomeUsuario, comentarios.comentario, comentarios.dataComentario, comentarios.nota FROM dados.comentarios JOIN dados.usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE comentarios.idLivros = %s',(idLivro,)
        )
        comentarios = cursor.fetchall()
        todosCometarios =[]
        for index in range(len(comentarios)):
            
            todosCometarios.append({
                    "Username": comentarios[index][0],
                    "Comentario": comentarios[index][1],
                    "Date":comentarios[index][2],
                    "Rating": comentarios[index][3]
                })
        cursor.close()
    return todosCometarios
        
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
        
