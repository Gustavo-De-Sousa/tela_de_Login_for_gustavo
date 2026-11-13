from flask import Flask, request, jsonify
from database import adicionar_usuario, adicionar_senha, verificar_usuario, verificar_senha

app = Flask(__name__)

@app.route("/cadastro", methods=["POST"])
def cadastro():
    email = request.get_json()
    adicionar_usuario(email["email"])
    senha = request.get_json()
    adicionar_senha(senha["senha"])
        
    return jsonify({"mensagem": "Cadastro!"})