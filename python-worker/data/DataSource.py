from abc import ABC, abstractmethod

class DataSource(ABC):
    

    @abstractmethod
    def select(self,  query: str, params : tuple = ()):
        pass

    @abstractmethod
    def update(self,  query: str, params : tuple = ()):
        pass

    @abstractmethod
    def insert(self,  query: str, params : tuple = ()):
        pass

    @abstractmethod
    def delete(self,  query: str, params : tuple = ()):
        pass
    

    @abstractmethod
    def commit(self, cursor):
        pass

    @abstractmethod
    def rollback(self, cursor):
        pass
  



