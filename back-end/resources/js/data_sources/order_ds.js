const { default: axios } = require("axios")

const OrderDs = {


    async storeOrder({ loanId, amountToFund }) {

        const response = await axios.post('orders', {
            'loan_id': loanId,
            'amount_to_fund': amountToFund
        });

        return new Promise(function(resolve, reject) {
            resolve(response.data.data);
        });

    },

    async getOrders() {

        const response = await axios.get('orders', );

        return new Promise(function(resolve, reject) {
            resolve(response.data.data);
        });

    }

}

export default OrderDs;