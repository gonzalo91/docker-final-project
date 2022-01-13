from abc import ABC, abstractmethod

class DataSource(ABC):
    

    @abstractmethod
    def select(self,  query: str, params : tuple = (), cursorP = None):
        pass

    @abstractmethod
    def update(self,  query: str, params : tuple = (), cursorP = None):
        pass

    @abstractmethod
    def insert(self,  query: str, params : tuple = (), cursorP = None):
        pass

    @abstractmethod
    def delete(self,  query: str, params : tuple = (), cursorP = None):
        pass

    @abstractmethod
    def beginTransaction(self, cursor):
        pass

    @abstractmethod
    def commit(self, cursor):
        pass

    @abstractmethod
    def rollback(self, cursor):
        pass

    @abstractmethod
    def getCursor(self):
        pass



