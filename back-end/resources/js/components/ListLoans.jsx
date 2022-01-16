import iziToast from 'izitoast';
import ReactDOM from 'react-dom';
import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';

import Loading from './shared/Loading';
import OrderDs from '../data_sources/order_ds';
import useLoansList from '../hooks/loans_hook';

const FundLoan = forwardRef( (props, ref) => {
    const [amount, setAmount] = useState("");
    const [loan, setLoan] = useState({id: '', });
    const [errors, setErrors] = useState([]);
    const [saving, setSaving] = useState(false);

    const hidePopUp = ()=>{
        $('#exampleModal').modal('hide')
    }

    const submitOrder = async (e)=>{
        e.preventDefault();

        setSaving(true);
        try{

            await OrderDs.storeOrder({ loanId : loan.id, amountToFund: amount});
            
            hidePopUp();

            setTimeout(() => {
                iziToast.success({
                    title: 'Exito!',
                    position: 'topRight',
                    message: 'Orden pujada exitosamente'
                }); 
            }, 1);
        }catch(e){            
            if(e.response && e.response.status == 422){
                setErrors([]);

                const errors = Object.entries( e.response.data.errors );                

                setErrors(errors.map(e => e[1][0]));
                
            }else{                
                setErrors(['Ha ocurrido un error en el servidor, intentelo de nuevo mas tarde']);
            }                             
            
        }finally{
            setSaving(false);
        }   

        
    }

    useImperativeHandle(
        ref,
        () => ({
            fund(loanToFund){       
                setAmount('');         
                setLoan(loanToFund);
                $('#exampleModal').modal('show')
            }
        }),
    )    

    return <>
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Orden # { loan.id }</h5>
                    
                </div>
                    <form onSubmit={ submitOrder }>
                        <div className="modal-body">
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Monto</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" value={amount}   
                                        onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Monto a prestar" required />
                                </div>
                            </div>
                            { errors.length > 0 && 
                                <ul className='text-danger mt-2 mb-0'>
                                    {errors.map(e => (
                                        <li>{e}</li>
                                    ))}
                                </ul>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hidePopUp}>Cerrar</button>
                            <button type="submit" disabled={saving} className="btn btn-primary">Crear orden</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

})

  
function ListLoans() {
    const [loading, loans, clickLoan] = useLoansList()
        
    let popUpRef = useRef();
                
    if( loading){
        return <Loading label={"prestamos"} />
    }    

    return (
      <>     
        
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col"># Prestamo</th>
                <th scope="col">Tasa</th>
                <th scope="col">Monto</th>
                <th scope="col">Monto Faltante</th>
                </tr>
            </thead>
            <tbody>
                { loans.map(loan=>{
                        return (
                            <tr onClick={() => clickLoan(loan, popUpRef)} key={loan.id} className={loan.orders_count > 0 ? 'table-success' : ''} style={{cursor: 'pointer'}} >
                                <th scope="row">{ loan.id }</th>
                                <td>{ loan.interest_rate }</td>
                                <td>{ loan.total_amount }</td>
                                <td>{ loan.amount_to_fund }</td>
                            </tr>
                        )
                    }) 
                }

                { loans.length == 0 && 
                    <tr className='text-bold'>
                        <td colSpan={4}>No hay prestamos para fondear</td>
                    </tr>
                }
                
            </tbody>
        </table>  
        
        <FundLoan ref={ popUpRef } />
      </>                  
    );
}

export default ListLoans;

if (document.getElementById('list-loans')) {
    ReactDOM.render(<ListLoans />, document.getElementById('list-loans'));
}
