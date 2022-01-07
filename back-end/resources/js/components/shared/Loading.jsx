import React from 'react';
  
function Loading(props) {    
    return (
        <>
            <div className='d-inline text-center'>
                 <h2 className='mt-3 text-primary'>Cargando {props.label}</h2>
                 <img className="d-block m-auto" srcSet="/img/loading.gif" width={100} alt="" />
            </div>
        </>
    );
}

export default Loading;


