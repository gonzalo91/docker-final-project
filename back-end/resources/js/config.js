const location = window.location.href
const url = process.env.NODE_ENV == 'production' ? location : process.env.MIX_APP_URL;

const config = {
    env: process.env.NODE_ENV,

    app_url: url,


    event_order_processed: 'order-processed',
    event_loan_funded: 'loan-funded',


    pubsub_order_processed: 'ORDER_PROCESSED',
    pubsub_loan_funded: 'LOAN_FUNDED',


}


export default config