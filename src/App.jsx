import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Clientes from "./views/clientes";
import './App.css';
import Encabezado from "./components/encabezado/Encabezado";
import Producto from "./views/productos";
import Categorias from "./views/Categorias";
import Ventas from "./views/Ventas";

const App = () => {
  return (
      <Router>
        //Contenedor principal con margen superior
      <main className="margen-superior-main">
      <Encabezado/>    
        <Routes>
         //Definicion de rutas
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<Clientes/>} />
          <Route path="/productos" element={<Producto/>} />
          <Route path="/categorias" element={<Categorias/>} />
          <Route path="/ventas" element={<Ventas/>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;