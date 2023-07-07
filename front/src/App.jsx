import "./App.css";
import {useEffect, useState, createContext} from "react"
import { useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Videojuego from "./components/Videojuego";

export const globalContext = createContext(null);

function App() {

  let navegacion = useNavigate();
  let objetoJuegos = JSON.parse(localStorage.getItem("JuegosCarrito"));

  const [tamaño, setTamaño] = useState((objetoJuegos ? objetoJuegos.length : 0));
  const [filtroJuegos, setFiltroJuegos] = useState({
    categorias: [],
    precio: 50000
  });

  const agregarCarrito = (name, value, imagen, id) => {
    objetoJuegos = JSON.parse(localStorage.getItem("JuegosCarrito")); 
    if (objetoJuegos === null) {
      objetoJuegos = []
      localStorage.setItem("JuegosCarrito", JSON.stringify([{ name, value, imagen, id }]));
    } else {
      localStorage.setItem("JuegosCarrito", JSON.stringify([...objetoJuegos, { name, value, imagen, id }]));
    }
    objetoJuegos.push({ name, value, imagen, id })
    setTamaño(objetoJuegos.length)
  };

  //Eliminar del carrito
  const eliminarJuego = (name) => {
    objetoJuegos = objetoJuegos.filter( juego => juego.name !== name )
    localStorage.setItem("JuegosCarrito", JSON.stringify(objetoJuegos));
    setTamaño(objetoJuegos.length)
  }

  //Limpiar carrito de compras
  const limpiarCarro = () => {
    localStorage.setItem("JuegosCarrito", JSON.stringify([]));
    setTamaño(0)
  }
  
  useEffect(() => {
    const autenticado = JSON.parse(localStorage.getItem("auth")).auth
    if (autenticado === false || autenticado == null) navegacion('/')
  }, []);

  return (
    <globalContext.Provider value={tamaño}>
      <NavBar 
        eliminarJuego={eliminarJuego}
        limpiarCarro={limpiarCarro}
      />
      <SideBar
        setFiltroJuegos={setFiltroJuegos}
        filtroJuegos={filtroJuegos}
      />
      <div className="principal-contenedor">
        <Videojuego 
          filtroJuegos={filtroJuegos}
          agregarCarrito={agregarCarrito}
        />
      </div>
    </globalContext.Provider>
  );
}

export default App;
