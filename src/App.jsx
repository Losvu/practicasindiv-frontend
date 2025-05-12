import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Clientes from "./views/clientes";
import Categorias from "./views/categorias";
import Encabezado from "./components/encabezado/Encabezado";
import Producto from "./views/productos";
import Ventas from "./views/ventas";
import Compras from "./views/Compras"; // ✅ Se agregó la importación de Compras
import "./App.css";

const App = () => {
  return (
    <Router>
      {/* Contenedor principal con margen superior */}
      <main className="margen-superior-main">
        <Encabezado />
        <Routes>
          {/* Definición de rutas */}
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} /> {/* ✅ Se agregó la ruta para Compras */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;