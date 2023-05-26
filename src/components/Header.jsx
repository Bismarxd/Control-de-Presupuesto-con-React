import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({presupuesto, setPresupuesto, validPresupuesto, setValidPresupuesto, gastos, setGastos}) => {
  return (
    <>
      <header>
        
          <h1 className='titulo'>Controlador de gastos</h1>

          {validPresupuesto ? (
            <ControlPresupuesto
              gastos = {gastos}
              presupuesto = {presupuesto}
              setGastos = {setGastos}
              setPresupuesto = {setPresupuesto}
              setValidPresupuesto = {setValidPresupuesto}
            />
          ) : (
            <NuevoPresupuesto
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            setValidPresupuesto = {setValidPresupuesto}
          />
          )}

         
        
        
      </header>
      
    </>
   
  )
}

export default Header