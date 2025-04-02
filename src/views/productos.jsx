import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los productos');
      }
      const datos = await respuesta.json();
      setProductos(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setListaCategorias(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.id_categoria || 
        !nuevoProducto.precio_unitario || !nuevoProducto.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      await obtenerProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Container>
      <h4>Lista de Productos</h4>

      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Nuevo Producto
      </Button>
      <br /><br />
      
      <Button variant="primary" onClick={obtenerProductos}>Actualizar Lista</Button>
      
      {cargando ? (
        <p>Cargando productos...</p>
      ) : errorCarga ? (
        <p>Error: {errorCarga}</p>
      ) : (
        <Table striped bordered hover responsive>
          <ModalRegistroProducto
            mostrarModal={mostrarModal}
            setMostrarModal={setMostrarModal}
            nuevoProducto={nuevoProducto}
            manejarCambioInput={manejarCambioInput}
            agregarProducto={agregarProducto}
            errorCarga={errorCarga}
            categorias={listaCategorias}
          />
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre Producto</th>
              <th>Descripción Producto</th>
              <th>ID Categoría</th>
              <th>Precio Unitario</th>
              <th>Stock</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.descripcion_producto}</td>
                <td>{producto.id_categoria}</td>
                <td>{producto.precio_unitario}</td>
                <td>{producto.stock}</td>
                <td>
                  {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.nombre_producto} width="50" height="50" />
                  ) : (
                    'Sin imagen'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Productos;
