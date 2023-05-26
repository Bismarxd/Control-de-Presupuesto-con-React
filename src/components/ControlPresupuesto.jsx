import { useState, useEffect } from 'react'
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Swal from 'sweetalert2';

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);

      const totalDisponible = presupuesto - totalGastado;

      //Calcular porcentaje
      const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100;

      
      setGastado(totalGastado);
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
      }, 1500);
      setDisponible(totalDisponible)

    }, [gastos])
    

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-BO', {
          style: 'currency',
          currency: 'BOB'
        });
      }

      const handleResetearAplicacion = () => {
        Swal.fire({
          title: '¿Deseas reiniciar la aplicación?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar',
          customClass: {
            container: 'my-swal',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setGastos([]);
            setPresupuesto(0);
            setValidPresupuesto(false);
            Swal.fire({
              title: '¡La aplicación se ha reiniciado!',
              icon: 'success'
            });
          }
        });
      };

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#E5514F' : '#64748b',
              trailColor: '#ffffff',
              textColor: porcentaje > 100 ? '#E5514F' : '#64748b',
            })}
              value = {porcentaje}
              text = {`${porcentaje.toFixed(2)}% GASTADO`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button
              className='reset-app'
              type='button'
              onClick={handleResetearAplicacion}
            >
            Reiniciar la aplicación
            </button>
            <p>
                Presupuesto <span>{formatearCantidad(presupuesto)}</span>
            </p>
            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                Disponible <span>{formatearCantidad(disponible)}</span>
            </p>
            <p>
                Gastado <span>{formatearCantidad(gastado)}</span>
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto