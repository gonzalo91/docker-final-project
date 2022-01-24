import { createClient } from 'redis';
import config from './config.js';

const redisTSL = config.env == 'production' ? 'rediss' : 'redis';

class Events {

    static url = `${redisTSL}://${config.redis_user}:${config.redis_pass}@${config.redis_host}:${config.redis_port}/${config.redis_db}`;

    server

    constructor(server) {
        this.server = server
    }


    async connect() {


        const client = createClient({
            url: Events.url
        });

        client.on('error', (err) => console.log('Redis Client Error', err));

        const subscriber = client.duplicate();

        await subscriber.connect();

        await subscriber.subscribe('order-processed', (message) => {
            const data = JSON.parse(message)

            this.server.emitOrderProcessed({
                'userId': data['user_id'],
                'status': data['status'],
                'orderId': data['order_id'],
            })

        });

        await subscriber.subscribe('loan-funded', (message) => {
            const data = JSON.parse(message);

            this.server.emitLoanFunded(data['loan_id'])
        });

    }


}

export default Events