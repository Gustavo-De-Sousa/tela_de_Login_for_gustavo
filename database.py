import sqlite3
from pathlib import Path

from werkzeug.security import generate_password_hash, check_password_hash

# Caminho do banco de dados
CAMINHO_BANCO = Path(__file__).resolve().parent / "usuarios.db"


# Conectar ao banco
def conectar():
    conexao = sqlite3.connect(CAMINHO_BANCO)
    conexao.row_factory = sqlite3.Row
    return conexao


# Criar tabela automaticamente
def criar_tabela():

    conexao = conectar()
    cursor = conexao.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nome TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            senha TEXT NOT NULL,

            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    """)

    conexao.commit()
    conexao.close()


# Cadastrar usuário
def cadastrar_usuario(nome, email, senha):

    conexao = conectar()
    cursor = conexao.cursor()

    senha_hash = generate_password_hash(senha)

    try:

        cursor.execute("""
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        """, (nome, email, senha_hash))

        conexao.commit()
        return True

    except sqlite3.IntegrityError:
        return False

    finally:
        conexao.close()


# Consultar usuário pelo e-mail
def buscar_usuario(email):

    conexao = conectar()
    cursor = conexao.cursor()

    cursor.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        (email,)
    )

    usuario = cursor.fetchone()
    conexao.close()

    return usuario


# Verificar senha
def verificar_senha(senha_digitada, senha_hash):

    return check_password_hash(senha_hash, senha_digitada)


# Atualizar senha
def atualizar_senha(email, nova_senha):

    conexao = conectar()
    cursor = conexao.cursor()

    senha_hash = generate_password_hash(nova_senha)

    cursor.execute("""
        UPDATE usuarios
        SET senha = ?
        WHERE email = ?
    """, (senha_hash, email))

    conexao.commit()

    atualizado = cursor.rowcount > 0

    conexao.close()

    return atualizado


# Executar criação da tabela
criar_tabela()