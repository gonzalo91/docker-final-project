import { Server } from './server.js'

import { createClient } from 'redis';
import config from './config.js';



const server = new Server();


server.listen();



(async() => {
    const url = 'redis://' + config.redis_host + ':' + config.redis_port
    const client = createClient({
        url: url
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('order-processed', (message) => {
        const data = JSON.parse(message)

        server.emitOrderProcessed({
            'userId': data['user_id'],
            'status': data['status'],
            'orderId': data['order_id'],
        })

    });

    await subscriber.subscribe('loan-funded', (message) => {
        const data = JSON.parse(message);

        server.emitLoanFunded(data['loan_id'])

    });
})();