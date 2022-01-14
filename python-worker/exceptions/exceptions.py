from abc import ABC, abstractmethod

class Error(Exception, ABC):
    
    @abstractmethod
    def getMessage(self) -> str:
        pass


class LoanFunded(Error):

    def getMessage(self) -> str:
        return 'Rechazada'    
    

class UserNotEnoughBalance(Error):
    def getMessage(self) -> str:
        return 'Sin saldo suficiente'
    
