import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VentasPorEmpleado = ({ empleados, total_ventas }) => {
  // Definir los datos para el gráfico
  const data = {
    labels: empleados, // Nombres de los empleados
    datasets: [
      {
        label: "Ventas (C$)",
        data: total_ventas, // Total de ventas por mes
        backgroundColor: "rgba(151, 67, 67, 0.2)",
        borderColor: "rgb(0, 30, 255)",
        borderWidth: 1,
      },
    ],
  };

  // Opciones de configuración del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Córdobas (C$)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Empleados",
        },
      },
    },
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por empleado</Card.Title>
        <div style={{ height: "100%", position: "relative" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};   

export default VentasPorEmpleado;