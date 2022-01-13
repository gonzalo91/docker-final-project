from repo.OrderFlowRepo import OrderFlowRepo

from data.DataSource import DataSource

class OrderFlowRepoImpl(OrderFlowRepo):

    __dataSource: DataSource = None    

    def __init__(self, dataSource: DataSource) -> None:
        self.__dataSource = dataSource

    
    def commit(self):
        self.__dataSource.commit()
    
    def rollback(self):
        self.__dataSource.rollback()

    
    #################
        

    def getLoanById(self, id: int):
        return self.__dataSource.select('SELECT * FROM loans WHERE id = %d FOR UPDATE', (id))

    def updateLoan(self, id: int, status: int, current_fund: float):
        return self.__dataSource.update('UPDATE loans SET status = %f, current_fund = %f \
         WHERE id=%d', (status, current_fund, id))

    ###########

    def getUserById(self, id: int):
        return self.__dataSource.select('SELECT * FROM users WHERE id = %d FOR UPDATE', (id))
    

    def substractBalance(self, id: int, balanceToSubstract: float):
        return self.__dataSource.update('UPDATE users SET balance - %f WHERE id = %d', 
        (balanceToSubstract, id))

    ########### Orders

    def setStatusToProcessing(self, ids: list):
        format_strings = ','.join(['%s'] * len(ids))

        return self.__dataSource.select('UPDATE orders \
            SET status =  %d \
            WHERE id IN (%s)' % format_strings, 
            tuple(ids)
        )

    def getOrderById(self, id: int):
        return self.__dataSource.select('SELECT * FROM orders WHERE id = %d FOR UPDATE', (id))

    def getOrderToProcess(self,) -> list:
        return self.__dataSource.select('SELECT * FROM orders WHERE status = 1 ORDER BY ASC FOR UPDATE')

    def updateOrder(self, id: int, status: int, realFund: float):
        return self.__dataSource.select('UPDATE orders \
            SET status = %d, real_fund = %f \
            WHERE id = %d',
            (status, realFund, id)
        )

    def updateOrderError(self, id: int, errorMsg : str):
        return self.__dataSource.select('UPDATE orders \
            SET status = 0, real_fund = 0, error_msg = %s \
            WHERE id = %d',
            (errorMsg, id)
        )



