from abc import ABC, abstractmethod

class FlowEvents(ABC):
    
    @abstractmethod
    def loanFunded(self, id: int):
        pass

    @abstractmethod
    def orderProcessed(self, id: int, status: str):
        pass


