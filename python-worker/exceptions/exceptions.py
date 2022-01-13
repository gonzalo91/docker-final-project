from abc import ABC, abstractmethod

class Error(Exception, ABC):
    
    @abstractmethod
    def getMessage() -> str:
        pass


class LoanFunded(Error):

    def getMessage() -> str:
        return 'Rechazada'    
    

class UserNotEnoughBalance(Error):
    def getMessage() -> str:
        return 'Sin saldo suficiente'
    
