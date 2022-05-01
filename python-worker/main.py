import time



from data.MySqlDataSource import MySqlDataSource
from repo.impl.OrderFlowRepoImpl import OrderFlowRepoImpl
from services.ProcessOrderServices import ProcessOrderServices
from events.impl.FlowEventsImpl import FlowEventsImpl

orderFlowRepoImpl = OrderFlowRepoImpl( MySqlDataSource() )

flowEventsImpl = FlowEventsImpl()

while(True):
    processOrderService = ProcessOrderServices ( orderFlowRepoImpl, flowEventsImpl )

    processOrderService.process()

    print('run!')
    time.sleep(60)

