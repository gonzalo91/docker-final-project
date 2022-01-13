import mysql.connector

from config import Config
from data.DataSource import DataSource

class MySqlDataSource(DataSource):
    
    __mysqlConn = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASS,
        database=Config.DB_NAME,
    )   

    def __init__(self) -> None:
        self.__mysqlConn.autocommit(False)
        
    def select(self, query: str, params : tuple = ()):        
        
        cursor = self.__mysqlConn.cursor(dictionary=True)
        
        cursor.execute(query, params)

        elements = cursor.fetchall()
        
        cursor.close()            

        return elements

    
    def update(self, query: str, params : tuple = ()):
        
        cursor = self.__mysqlConn.cursor(dictionary=True)
        
        cursor.execute(query, params) 

        return cursor.rowcount

    
    def insert(self, query: str, params : tuple = ()):
        
        cursor = self.__mysqlConn.cursor(dictionary=True)
        
        cursor.execute(query, params)        
                
    
    def delete(self, query: str, params : tuple = ()):
                
        cursor = self.__mysqlConn.cursor(dictionary=True)
        
        cursor.execute(query, params) 

        return cursor.rowcount
        
    
    def commit(self):
        self.__mysqlConn.commit()
    
    def rollback(self):
        self.__mysqlConn.rollback()