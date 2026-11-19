import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from database import cadastrar_usuario, verificar_senha, buscar_usuario

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/inicio")
@app.route("/inicio")
def inicio():
    if "usuario_id" not in session:
        return redirect(url_for("home"))
        
    nome = session.get("usuario_nome")
    return f"<h1>Bem-vindo ao sistema, {nome}!</h1>"

@app.route("/cadastro", methods=["POST"])
def cadastro():

    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    senha = dados.get("senha")

    if not nome or not email or not senha:
        return jsonify({
            "mensagem": "Preencha todos os campos!"
        }), 400

    resultado = cadastrar_usuario(nome, email, senha)

    if resultado:

        return jsonify({
            "mensagem": "Cadastro realizado!"
        }), 201

    return jsonify({
        "mensagem": "E-mail já cadastrado!"
    }), 409

@app.route("/login", methods=["POST"])
def login():

    dados = request.get_json()

    email = dados.get("email")
    senha = dados.get("senha")

    usuario = buscar_usuario(email)


    if usuario is None:
        return jsonify({
            "mensagem": "E-mail ou senha incorretos!"
        }), 401


    resultado = verificar_senha(
        senha,
        usuario["senha"]
    )

    if not resultado:
        return jsonify({
            "mensagem": "E-mail ou senha incorretos!"
        }), 401

    session["usuario_id"] = usuario["id"]
    session["usuario_nome"] = usuario["nome"] 

    return jsonify({
        "mensagem": f"Bem-vindo, {usuario['nome']}!",
        "redirecionar": "/inicio"
    }), 200
if __name__ == "__main__":
    app.run(debug=True)
    app.run(host="0.0.0.0")