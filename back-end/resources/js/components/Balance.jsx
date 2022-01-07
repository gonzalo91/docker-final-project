import React, {useState} from 'react';
import ReactDOM from 'react-dom';


  
function Balance() {
    const [balance, setBalance] = useState(0);


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
