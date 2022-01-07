import React from 'react';
import ReactDOM from 'react-dom';

function Car(props) {
    return <li>I am a { props.brand }</li>;
}
  
function Garage() {
    const cars = ['Ford', 'BMW s', 'Audi'];
    return (
      <div>
        <h1>Who lives in my garage?</h1>
        <ul>
          {cars.map((car) => <Car key={car} brand={car} />)}
        </ul>
      </div>
    );
}

export default Garage;

if (document.getElementById('garage')) {
    ReactDOM.render(<Garage />, document.getElementById('garage'));
}
