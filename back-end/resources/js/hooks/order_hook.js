import { useState, useEffect } from 'react';
import config from '../config';


import OrderDs from '../data_sources/order_ds';

function useOrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(handleOrderProcessed, []);

    async function handleOrderProcessed() {
        const orders = await OrderDs.getOrders();
        setOrders(orders);
        setLoading(false);
    }

    useEffect(() => {

        const token = PubSub.subscribe(config.pubsub_order_processed, handleOrderProcessed);

        return () => {
            PubSub.unsubscribe(token);
        };
    });

    return [orders, loading];
}

export default useOrderList