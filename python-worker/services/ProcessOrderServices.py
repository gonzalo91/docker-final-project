from exceptions import exceptions
from repo.OrderFlowRepo import OrderFlowRepo


class ProcessOrderServices():

    orderFlowRepo : OrderFlowRepo = None

    def __init__(self, 
        orderFlowRepo: OrderFlowRepo,        
    ):           
        self.orderFlowRepo = orderFlowRepo                



    def process(self):

        try:        
            orders = self.orderFlowRepo.getOrderToProcess() 

            if(len(orders) == 0):
                raise Exception()                
            
            orderIds = list(map(lambda o : o['id'], orders))                        

            self.orderFlowRepo.setStatusToProcessing(orderIds)
            
            self.orderFlowRepo.commit()
        except Exception as e:

            self.orderFlowRepo.rollback()
            
            return        

        for order in orders:
            userId = order['user_id']
            loanId = order['loan_id']
            userAmountFund = order['user_fund']

            realAmountToFund = userAmountFund            


            try:
                loan = self.orderFlowRepo.getLoanById(loanId) 
                
                if(loan['status'] != 1):
                    raise exceptions.LoanFunded()


                loanAmountToFund =  loan['total_amount'] - loan['current_fund']

                loanAmountToFundAfter = loanAmountToFund - userAmountFund

                if loanAmountToFundAfter < 0:
                    realAmountToFund = loanAmountToFund

                user = self.orderFlowRepo.getUserById(userId) # Lock

                status =  1 if loanAmountToFundAfter > 0 else 2

                if user['balance'] < realAmountToFund:
                    raise exceptions.UserNotEnoughBalance()

                self.orderFlowRepo.substractBalance(userId, realAmountToFund)

                newCurrentFund = loan['current_fund'] + realAmountToFund

                if(status == 1):
                    self.orderFlowRepo.updateLoan(loanId, newCurrentFund)
                else:
                    self.orderFlowRepo.completeLoan(loanId, newCurrentFund)

                self.orderFlowRepo.updateOrder(order['id'], 3, realAmountToFund)

                self.orderFlowRepo.commit()
            except exceptions.Error as e:                
                try:
                    self.orderFlowRepo.rollback()
                except:
                    pass
                self.orderFlowRepo.updateOrderError(order['id'], e.getMessage() )
                self.orderFlowRepo.commit()
                
            except Exception as e:
                try:
                    self.orderFlowRepo.rollback()
                except:
                    pass
                                
                self.orderFlowRepo.updateOrderError(order['id'], 'Desconocido' )
                self.orderFlowRepo.commit()
                


  



