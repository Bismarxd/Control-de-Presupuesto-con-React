import { object } from "prop-types";
import { useState, useEffect } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from './img/nuevo-gasto.svg';



function App() {

  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem('presupuesto') ?? 0
  );

  
  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem("gastos")) ?? []),
  ]);

  const [validPresupuesto, setValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);


  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
    

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
    
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    
  }, [gastos])
  
  useEffect(() => {
    
    if (filtro) {
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria == filtro);
      
      setGastosFiltrados(gastosFiltrados);
    }
    
  }, [filtro])
  
  
  useEffect(() => {
    const presupuestols = Number(localStorage.getItem('presupuesto')) ?? 0;

   if (presupuestols > 0) {
      setValidPresupuesto(true)
   }
  }, [])
  

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {

    if (gasto.id) 
    {
      //Actualizar
      const gastosActualizao = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizao);
      setGastoEditar({})
    }
    else 
    {
      //Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 500);

    }

    const eliminarGasto = id => {
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

      setGastos(gastosActualizados);


    }

  return (
   <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        validPresupuesto = {validPresupuesto}
        setValidPresupuesto = {setValidPresupuesto}
      />

      {validPresupuesto && (
        <>
          <main>
          <Filtros
            filtro = {filtro}
            setFiltro = {setFiltro}
            />
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          
          <div className="nuevo-gasto">
          <img 
            src={IconoNuevoGasto} 
            alt="nuevo gasto" 
            onClick={handleNuevoGasto}
          />
            
          </div>
        </>
      )}

      {modal && 
                <Modal 
                  setModal ={setModal}
                  animarModal = {animarModal}
                  setAnimarModal = {setAnimarModal}
                  guardarGasto = {guardarGasto}
                  gastoEditar = {gastoEditar}
                  setGastoEditar = {setGastoEditar}
                />}
      
   </div>
  )
}

export default App
