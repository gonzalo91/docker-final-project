from events.FlowEvents import FlowEvents

import json
import redis

from config import Config

class FlowEventsImpl(FlowEvents):
    

    def __init__(self) -> None:
        requireSsl = Config.ENV == 'production'        
        
        self.redis = redis.StrictRedis(
            host=Config.REDIS_HOST, 
            port=Config.REDIS_PORT, 
            password=Config.REDIS_PASS, 
            db=Config.REDIS_DB,
            ssl=requireSsl,
            ssl_cert_reqs=None,
        )
    
    
    def loanFunded(self, id: int):
        data = {
            'loan_id' : id
        }
        
        self.redis.publish('loan-funded', json.dumps(data))

    
    def orderProcessed(self, id: int, userId: int, status: str):
        data = {
            'order_id': id,
            'status'  : status,
            'user_id' : userId,
        }

        self.redis.publish('order-processed', json.dumps(data))
        

