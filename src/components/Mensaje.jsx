import React, { Children } from 'react'
import { useState, useEffect } from 'react';

const Mensaje = ({children, tipo}) => {

     
  return (
   
    <div className={`alerta ${tipo}`}>
    {children}
    </div>

   
  )
}

export default Mensaje