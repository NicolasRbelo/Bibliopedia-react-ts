from flask import Blueprint
from livroController import *
from userController import *


blueprint = Blueprint('blueprint',__name__)

##livros

blueprint.route('/livros/<int:idUsuario>', methods=['GET'])(TodosLivros)
blueprint.route('/livro', methods=['POST'])(SalveLivro)
blueprint.route('/livro/<Pesquisa>', methods=['GET'])(ListadeLivros)
#blueprint.route('/livro/<int:id>', methods=['DELETE'])(removerUmLivro)

##Usuarios

blueprint.route('/usuarios', methods=['GET'])(listarTodosUsuario)
blueprint.route('/usuario', methods=['POST'])(salvarUsuario)
blueprint.route('/usuario/<int:id>', methods=['GET'])(listarApenasUmUsuario)
blueprint.route('/usuario/<int:id>', methods=['PUT'])(atualizarUmUsuario)
blueprint.route('/usuario/<int:id>', methods=['DELETE'])(removerUmUsuario)
blueprint.route('/login', methods=['GET','POST'])(login)
blueprint.route('/logout',methods=['POST'])(logout)




##Comentario
blueprint.route('/comentarios/<idLivro>', methods=['GET'])(Vercomentarios)
blueprint.route('/comentario', methods=['POST'])(salvarComentario)


##Rating
blueprint.route('/rating-media/<idLivro>',methods=['GET'])(notaLivro)

