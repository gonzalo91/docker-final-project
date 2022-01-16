import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import useBalance from '../hooks/balance_hook';



  
function Balance() {
    const balance = useBalance(0);

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
