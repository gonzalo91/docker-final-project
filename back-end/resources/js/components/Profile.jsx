import iziToast from 'izitoast';
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from 'react';
import ProfileDS from '../data_sources/profile_ds';

function Profile({ name, order_count, order_route}){

    const [file, setFile] = useState(null);
    const [errors, setErrors ] = useState([]);


    const onFileChanged = (event) =>{        
        setFile(event.target.files[0]);        
    }

    const submitFile = async () => {
        if(file == null)
            return iziToast.error({
                title: 'Debe Seleccionar un archivo!',
                position: 'topRight',            
            }); 

        const formData = new FormData(); 
            
        formData.append( 
            "image_profile", 
            file, 
            file.name 
        ); 

        try{

            await ProfileDS.updateImageProfile(formData)

            setFile(null)
            setErrors([]);
            getImageProfile()

        }catch(e){
            if(e.response && e.response.status == 422){
                setErrors([]);

                const errors = Object.entries( e.response.data.errors );                

                setErrors(errors.map(e => e[1][0]));
                
            }else{                
                setErrors(['Ha ocurrido un error en el servidor, intentelo de nuevo mas tarde']);
            }                                         
        }


    }


    const getImageProfile = () => {
        ProfileDS.getImageProfile()
            .then(({image_profile}) => {
                setImage(image_profile)
            })
    }

    const [image, setImage] = useState("");

    useEffect(getImageProfile, [])

    return (
        <>            
            <div className="flex-shrink-0">
                <img  src={image} alt="Generic placeholder image" className="img-fluid" style={{width: '180px', borderRadius: '10px'}} />
            </div>
            <div className="flex-grow-1 ms-3">
                <h5 className="mb-1">{ name }</h5>                    
                <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{backgroundColor: '#efefef'}}>
                    <div>
                        <p className="small text-muted mb-1">Ordenes</p>
                        <p className="mb-0">
                            <a href={ order_route }>{ order_count }</a>
                        </p>
                    </div>
                
                </div>
                <p>Imagen</p> 
                <div className="d-flex pt-1">                            
                    <input type="file" onChange={onFileChanged} className="btn btn-outline-primary me-1 flex-grow-1" />                                        
                </div>
                
                { errors.length > 0 && 
                    <div className="d-flex pt-1">
                        <ul className='text-danger mt-2 mb-0'>
                            {errors.map(e => (
                                <li>{e}</li>
                            ))}
                        </ul>
                    </div>
                }
                <div className="d-flex pt-1">
                    <button onClick={submitFile} className="btn btn-success">Subir!</button>
                </div>
            </div>
        </>
    )

}

export default Profile;

if (document.getElementById('profile')) {
    const element = document.getElementById('profile');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Profile {...props} />, element);
}
