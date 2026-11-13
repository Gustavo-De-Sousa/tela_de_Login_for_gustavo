import sqlite3

conexao = sqlite3.connect("banco.db")
cursor = conexao.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS usuarios_cadastrados (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    senha TEXT NOT NULL
    )""")

def adicionar_usuario(email):
    cursor.execute(
        """INSERT INTO usuarios_cadastrados (usuario) VALUES (?)""",
        (email,)
    )
    conexao.commit()
    
def verificar_usuario(email):
    cursor.execute(
        """SELECT INTO usuarios_cadastrados (usuario)"""
    )
    
def adicionar_senha(senha):
    cursor.execute(
        """INSERT INTO usuarios_cadastrados (senha) VALUES (?)""",
        (senha,)
    )
    conexao.commit()
    
def verificar_senha(senha):
    cursor.execute(
        """SELECT INTO usuarios_cadastrados (senha)"""
    )
