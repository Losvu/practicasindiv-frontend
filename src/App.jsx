import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Clientes from "./views/clientes";
import Categorias from "./views/Categorias.jsx";
import Encabezado from "./components/encabezado/Encabezado";
import Productos from "./views/productos";
import Ventas from "./views/ventas";
import Compras from "./views/Compras";
import "./App.css";
import CatalogoProductos from "./views/CatalogoProductos.jsx";
import Estadisticas from "./views/Estadisticas.jsx";
import Dashboard from "./views/Dashboard.jsx";
import RutaProtegida from "./components/rutas/RutaProtegida.jsx";
import PiePagina from "./components/infopie/PiePagina.jsx";

const App = () => {
return (
  <Router>
    <div className="app-wrapper">
      <Encabezado />
      <main className="margen-superior-main-content">
        <Routes>
          {/* Rutas */}
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />
          <Route path="/categorias" element={<RutaProtegida vista={<Categorias />} />} />
          <Route path="/clientes" element={<RutaProtegida vista={<Clientes />} />} />
          <Route path="/ventas" element={<RutaProtegida vista={<Ventas />} />} />
          <Route path="/compras" element={<RutaProtegida vista={<Compras />} />} />
          <Route path="/productos" element={<RutaProtegida vista={<Productos />} />} />
          <Route path="/catalogoproductos" element={<RutaProtegida vista={<CatalogoProductos />} />} />
          <Route path="/estadisticas" element={<RutaProtegida vista={<Estadisticas />} />} />
          <Route path="/dashboard" element={<RutaProtegida vista={<Dashboard />} />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  </Router>
);
};

export default App;