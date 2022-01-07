import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Loading from './shared/Loading';


  
function ListOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    if( loading){
        return <Loading label={"tus ordenes"} />
    }

    return (
      <>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col"># Orden</th>
                <th scope="col"># Prestamo</th>
                <th scope="col">Monto</th>
                <th scope="col">Estatus</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order => {
                        return <>
                        
                        <tr>
                            <th scope="row">1</th>
                            <td>300</td>
                            <td>$ 500.00</td>
                            <td class="text-success">Al Corriente</td>
                        </tr>
                        
                        </>
                    })
                }
                

                { orders.length == 0 && 
                    <tr className='text-bold'>
                        <td colSpan={4}>Aun no tienes ordenes</td>
                    </tr>
                }

                
                
            </tbody>
        </table>
      </>
    );
}

export default ListOrders;

if (document.getElementById('list-orders')) {
    ReactDOM.render(<ListOrders />, document.getElementById('list-orders'));
}
