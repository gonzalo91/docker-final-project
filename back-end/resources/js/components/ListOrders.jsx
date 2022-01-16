import ReactDOM from 'react-dom';
import React, {useState, useEffect} from 'react';


import Loading from './shared/Loading';
import useOrderList from '../hooks/order_hook';



  
function ListOrders() {
    const [orders, loading] = useOrderList()

    if( loading){
        return <Loading label={"tus ordenes"} />
    }

    const colorStatus = (status) => {
        let color = '';

        switch(status){
            case 0:
                color = 'text-danger';                
                break;
            case 1:
                color = 'text-primary';
                break;
            case 2:
                color = 'text-warning';
                break;
            case 3: 
                color = 'text-success';                
                break;
        }

        return color;
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
                        
                        <tr key={order.id}>
                            <th scope="row">{order.id}</th>
                            <td>{ order.loan_id }</td>
                            <td>{ order.amount_to_show }</td>
                            <td className={colorStatus(order.status)}> { order.status_text }</td>
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
