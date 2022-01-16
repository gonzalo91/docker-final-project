const config = {

    app_url: process.env.MIX_APP_URL || 'localhost',



    event_order_processed: 'order-processed',
    event_loan_funded: 'loan-funded',


    pubsub_order_processed: 'ORDER_PROCESSED',
    pubsub_loan_funded: 'LOAN_FUNDED',


}


export default config