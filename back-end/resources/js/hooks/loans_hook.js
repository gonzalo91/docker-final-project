import { useState, useEffect, } from 'react';

import config from '../config';
import LoanDS from '../data_sources/loan_ds';

function useLoansList() {

    const [loading, setLoading] = useState(true);
    const [loans, setLoans] = useState([]);

    const clickLoan = (loan, popUpRef) => {
        popUpRef.current.fund(loan)
    }

    useEffect(handleLoansChange, []);

    function handleLoansChange() {
        LoanDS.getLoansToFund()
            .then(resp => {
                setLoans(resp);
                setLoading(false);
            })
    }

    useEffect(() => {

        const token = PubSub.subscribe(config.pubsub_order_processed, handleLoansChange);
        const token2 = PubSub.subscribe(config.pubsub_loan_funded, handleLoansChange);

        return () => {
            PubSub.unsubscribe(token);
            PubSub.unsubscribe(token2);
        };
    });

    return [loading, loans, clickLoan];
}

export default useLoansList