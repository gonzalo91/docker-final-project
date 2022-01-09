const { default: axios } = require("axios")

const LoanDS = {


    async getLoansToFund() {

        const response = await axios.get('loans');

        return new Promise(function(resolve, reject) {
            resolve(response.data.data);
        });

    }

}

export default LoanDS;