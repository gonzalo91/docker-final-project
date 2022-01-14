from abc import ABC, abstractmethod

class OrderFlowRepo(ABC):
    
    @abstractmethod
    def commit(self):
        pass

    @abstractmethod
    def rollback(self):
        pass

    #############

    @abstractmethod
    def getLoanById(self, id: int):
        pass

    @abstractmethod
    def updateLoan(self, id: int, current_fund: float):
        pass

    @abstractmethod
    def completeLoan(self, id: int, current_fund: float):
        pass

    ###########

    @abstractmethod
    def getUserById(self, id: int):
        pass
    

    @abstractmethod
    def substractBalance(self, id: int, balanceToSubstract: float):
        pass

    ###########

    @abstractmethod
    def setStatusToProcessing(self, ids: list):
        pass

    @abstractmethod
    def getOrderById(self, id: int):
        pass

    @abstractmethod
    def getOrderToProcess(self,) -> list:
        pass

    @abstractmethod
    def updateOrder(self, id: int, status: int, realFund: float):
        pass
    

    @abstractmethod
    def updateOrderError(self, id: int, errorMsg : str):
        pass


