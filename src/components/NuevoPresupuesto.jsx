import { useState, useEffect } from 'react';
import React from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('');


    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            
            setMensaje('No es posible procesar este presupuesto');
            setPresupuesto('')
            
            setTimeout(() => {
                setMensaje('');
            }, 3000);
            
        }else{
           
            setMensaje('')
            setValidPresupuesto(true)
            
        }
            
            
        

    }


        

return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
            
                <div className='campo'>
                
                    <label>Definir Presupuesto</label>
                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
                    <input 
                        className='nuevo-presupuesto'
                        type="number" 
                        placeholder='Añade tu Presupuesto'
                        value={presupuesto}
                        onChange= { e => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input 
                    type="submit" 
                    value='Añadir'
                />

            
            </form>
        </div>
)
}

export default NuevoPresupuesto;