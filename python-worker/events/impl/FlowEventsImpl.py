from events.FlowEvents import FlowEvents

import json
import redis

from config import Config

class FlowEventsImpl(FlowEvents):
    

    def __init__(self) -> None:
        self.redis = redis.Redis(host=Config.REDIS_HOST, port=Config.REDIS_PORT, db=Config.REDIS_DB)
    
    
    def loanFunded(self, id: int):
        data = {
            'loan_id' : id
        }

        self.redis.publish('loan-funded', json.dumps(data))

    
    def orderProcessed(self, id: int, status: str):
        data = {
            'order_id': id,
            'status'  : status,
        }

        self.redis.publish('order-processed', json.dumps(data))
        

