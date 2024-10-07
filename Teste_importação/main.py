from flask import Blueprint
from livro import *


blueprint = Blueprint('blueprint',__name__)

##livros

blueprint.route('/livros', methods=['GET'])(TodosLivros)
blueprint.route('/livro', methods=['POST'])(SalveLivro)
#blueprint.route('/livro/<int:id>', methods=['DELETE'])(removerUmLivro)#

##Usuarios

blueprint.route('/usuarios', methods=['GET'])(listarTodosUsuario)
blueprint.route('/usuario', methods=['POST'])(salvarUsuario)
blueprint.route('/usuario/<int:id>', methods=['GET'])(listarApenasUmUsuario)
blueprint.route('/usuario/<int:id>', methods=['PUT'])(atualizarUmUsuario)
blueprint.route('/usuario/<int:id>', methods=['DELETE'])(removerUmUsuario)
blueprint.route('/login', methods=['GET','POST'])(login)
blueprint.route('/logout',)


##Comentario

blueprint.route('/usuario', methods=['POST'])(salvarComentario)

