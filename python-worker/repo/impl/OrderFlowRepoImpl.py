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
        loan = self.__dataSource.select("SELECT * FROM loans WHERE id = %s FOR UPDATE", (id,))

        if(loan):
            return loan[0]
        
        return None

    def updateLoan(self, id: int, current_fund: float):
        return self.__dataSource.update('UPDATE loans SET current_fund = %s \
         WHERE id=%s', ( current_fund, id,))

    
    def completeLoan(self, id: int, current_fund: float):
        return self.__dataSource.update('UPDATE loans SET current_fund = %s, \
            status = 2, completed_at = now() \
         WHERE id=%s', ( current_fund, id,))

    ###########

    def getUserById(self, id: int):
        user = self.__dataSource.select('SELECT * FROM users WHERE id = %s FOR UPDATE', (id,))

        if(user):
            return user[0]
        return None
    

    def substractBalance(self, id: int, balanceToSubstract: float):
        return self.__dataSource.update('UPDATE users SET balance = balance - %s WHERE id = %s', 
        (balanceToSubstract, id))

    ########### Orders

    def setStatusToProcessing(self, ids: list):
        format_strings = ','.join(['%s'] * len(ids))

        return self.__dataSource.update('UPDATE orders \
            SET status =  2 \
            WHERE id IN (%s)' % format_strings, 
            tuple(ids)
        )

    def getOrderById(self, id: int):
        order = self.__dataSource.select('SELECT * FROM orders WHERE id = %s FOR UPDATE', (id,))

        if(order):
            return order[0]
        return None

    def getOrderToProcess(self,) -> list:
        return self.__dataSource.select('SELECT * FROM orders WHERE status = 1 ORDER BY id ASC FOR UPDATE')

    def updateOrder(self, id: int, status: int, realFund: float):
        return self.__dataSource.select('UPDATE orders \
            SET status = %s, real_fund = %s \
            WHERE id = %s',
            (status, realFund, id,)
        )

    

    def updateOrderError(self, id: int, errorMsg : str):
        return self.__dataSource.select('UPDATE orders \
            SET status = 0, real_fund = 0, error_msg = %s \
            WHERE id = %s',
            (errorMsg, id,)
        )



