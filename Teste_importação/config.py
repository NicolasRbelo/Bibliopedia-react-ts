import mysql.connector

def conexao():
    return mysql.connector.connect(      
        host='localhost',
        user='root',
        password='Side1912*',
        database='dados',
    )
