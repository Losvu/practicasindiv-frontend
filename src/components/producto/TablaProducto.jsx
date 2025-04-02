import React from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Productos from '../../views/Productos';

// Componente TablaProducto
const TablaProducto = ({ productos }) => {
  return (
    <Container>
      <Table striped bordered hover responsive>
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
    </Container>
  );
};

export default TablaProducto;