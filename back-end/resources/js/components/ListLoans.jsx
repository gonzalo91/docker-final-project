import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import Loading from './shared/Loading';

const FundLoan = forwardRef( (props, ref) => {
    const [amount, setAmount] = useState("");
    const [loan, setLoan] = useState({id: '', });

    const hidePopUp = ()=>{
        $('#exampleModal').modal('hide')
    }

    const submitOrder = (e)=>{
        e.preventDefault();

        console.log(amount);
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hidePopUp}>Cerrar</button>
                            <button type="submit" className="btn btn-primary">Crear orden</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

})

  
function ListLoans() {
    const [loading, setLoading] = useState(true);
    const [loans, setLoans] = useState([]);

    
    let popUpRef = useRef();

    const clickLoan = (loan) => {        
        popUpRef.current.fund(loan)        
    }
    

    setTimeout(() => {
        setLoading(false)

        setTimeout(() => {
            setLoans([
                {
                    'id': 1,
                    'rate' : '18.6 %',
                    'amount': '120,000.00',
                    'amount_to_fund': '100,000.00',
                    'user_has_fund': true,
                },
                {
                    'id': 3,
                    'rate' : '18.6 %',
                    'amount': '20,000.00',
                    'amount_to_fund': '4,000.00',
                    'user_has_fund': false,
                },
                {
                    'id': 2,
                    'rate' : '15.6 %',
                    'amount': '320,000.00',
                    'amount_to_fund': '280,000.00',
                    'user_has_fund': false,
                },
            ])    
        }, 2000);
    }, 2000);

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
                            <tr onClick={() => clickLoan(loan)} key={loan.id} className={loan.user_has_fund ? 'table-success' : ''} style={{cursor: 'pointer'}} >
                                <th scope="row">{ loan.id }</th>
                                <td>{ loan.rate }</td>
                                <td>{ loan.amount }</td>
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
