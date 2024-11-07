from flask import Flask,session
from main import blueprint
from flask_cors import CORS
from flask_session import Session

app = Flask(__name__)
sess = Session()
CORS(app)
app.config['SECRET_KEY'] =  'Side1912*'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
app.register_blueprint(blueprint)
(app.run(host='127.0.0.1', port=5500, debug=True))

