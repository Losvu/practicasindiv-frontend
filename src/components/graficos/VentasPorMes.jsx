import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VentasPorMes = ({ meses, totales_por_mes }) => {
  // Definir los datos para el gráfico
  const data = {
    labels: meses, // Nombres de los meses
    datasets: [
      {
        label: "Ventas (C$)",
        data: totales_por_mes, // Total de ventas por mes
        backgroundColor: "rgba(87, 123, 123, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
          text: "Meses",
        },
      },
    },
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por mes</Card.Title>
        <div style={{ height: "100%", position: "relative" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorMes;