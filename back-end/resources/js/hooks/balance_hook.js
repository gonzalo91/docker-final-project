import { useState, useEffect } from 'react';

import config from '../config';
import BalanceDS from '../data_sources/balance_ds';

function useBalance(initialBalance = '0') {
    const [balance, setBalance] = useState(initialBalance);


    function handleBalanceChange() {
        BalanceDS.getBalance().then(response => {
            setBalance(response.balance);
        });
    }

    useEffect(handleBalanceChange, [])

    useEffect(() => {

        const token = PubSub.subscribe(config.pubsub_order_processed, handleBalanceChange);

        return () => {
            PubSub.unsubscribe(token);
        };
    });

    return balance;
}

export default useBalance