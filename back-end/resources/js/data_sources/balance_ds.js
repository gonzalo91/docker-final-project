const { default: axios } = require("axios")

const BalanceDS = {


    async getBalance() {

        const response = await axios.get('balance');

        return new Promise(function(resolve, reject) {
            resolve(response.data);
        });

    }

}

export default BalanceDS;