import time



from data.MySqlDataSource import MySqlDataSource
from repo.impl.OrderFlowRepoImpl import OrderFlowRepoImpl
from services.ProcessOrderServices import ProcessOrderServices

orderFlowRepoImpl = OrderFlowRepoImpl( MySqlDataSource() )

while(True):
    processOrderService = ProcessOrderServices ( orderFlowRepoImpl )

    processOrderService.process()

    print('run!')
    time.sleep(5)

