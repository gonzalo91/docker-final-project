from pyfcm import FCMNotification
from exceptions import exceptions

from config import Config
from events.FlowEvents import FlowEvents
from repo.OrderFlowRepo import OrderFlowRepo

class ProcessOrderServices():

    orderFlowRepo : OrderFlowRepo = None

    flowEvent     : FlowEvents = None

    def __init__(self, 
        orderFlowRepo: OrderFlowRepo, 
        flowEvent    : FlowEvents,       
    ):           
        self.orderFlowRepo = orderFlowRepo                
        self.flowEvent     = flowEvent



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
            events = []

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

                user = self.orderFlowRepo.getUserById(userId) 

                status =  1 if loanAmountToFundAfter > 0 else 2

                if user['balance'] < realAmountToFund:
                    raise exceptions.UserNotEnoughBalance()

                self.orderFlowRepo.substractBalance(userId, realAmountToFund)

                newCurrentFund = loan['current_fund'] + realAmountToFund
                

                if(status == 1):
                    self.orderFlowRepo.updateLoan(loanId, newCurrentFund)
                else:
                    events.append({'type' : 1, 'loan_id': loanId})
                    self.orderFlowRepo.completeLoan(loanId, newCurrentFund)


                self.orderFlowRepo.updateOrder(order['id'], 3, realAmountToFund)
                events.append({'type' : 2, 'order_id': order['id'], 'user_id': userId, 'status': 'ok'})

                self.orderFlowRepo.commit()
            except exceptions.Error as e:                
                events = []
                try:
                    self.orderFlowRepo.rollback()
                except:
                    pass
                self.orderFlowRepo.updateOrderError(order['id'], e.getMessage() )
                self.orderFlowRepo.commit()
                events.append({'type' : 2, 'order_id': order['id'], 'user_id': userId, 'status': 'refused'})
                
            except Exception as e:
                events = []
                try:
                    self.orderFlowRepo.rollback()
                except:
                    pass
                                
                self.orderFlowRepo.updateOrderError(order['id'], 'Desconocido' )
                self.orderFlowRepo.commit()
                events.append({'type' : 2, 'order_id': order['id'], 'user_id': userId, 'status': 'refused'})

            self.dispatchEvents(events)

    
    def dispatchEvents(self, events):
        for event in events:
            
            if event['type'] == 1:
                self.flowEvent.loanFunded(event['loan_id'])

            if(event['type'] == 2):
                self.flowEvent.orderProcessed(event['order_id'], event['user_id'], str(event['status']))
                self.__dispactchPushNotifications(event['order_id'], event['user_id'], str(event['status']))

    def __dispactchPushNotifications(self, orderId, userId, status):
        tokens_list = self.orderFlowRepo.getFcmTokens(userId)
        tokens = list(map(lambda t : t['token'], tokens_list))

        key = Config.FCM_KEY        
        push_service = FCMNotification(api_key=key)

        message_title = "Orden %s Procesada" % orderId
        message_body = "Aceptada" if status == 'ok' else "Rechazada"
        push_service.notify_multiple_devices(registration_ids=tokens, message_title=message_title, message_body=message_body)
                


  



