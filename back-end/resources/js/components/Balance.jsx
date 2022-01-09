import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import BalanceDS from '../data_sources/balance_ds';


  
function Balance() {
    const [balance, setBalance] = useState(0);

    BalanceDS.getBalance().then( response => {
      
      setBalance(response.balance);
    });


    return (
      <>
        { balance }  
      </>
    );
}

export default Balance;

if (document.getElementById('balance')) {
    ReactDOM.render(<Balance />, document.getElementById('balance'));
}
