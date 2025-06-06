import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

const chartRef = useRef(null);
const generarPDF = () => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(28, 41, 51);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Reporte de Ventas por Mes", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

  // Capturar gráfico como imagen
  const chartInstance = chartRef.current;
  const chartCanvas = chartInstance?.canvas;
  const chartImage = chartCanvas?.toDataURL("image/png", 1.0);

  if (chartImage) {
    doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
  }

  // Tabla de datos
  const columnas = ["Mes", "Ventas (C$)"];
  const filas = meses.map((mes, index) => [mes, totales_por_mes[index]]);

  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 150,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    margin: { top: 20, left: 14, right: 14 },
  });

  // Generar un nombre dinámico para el archivo PDF
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  const nombreArchivo = `VentasPorMes_${dia}${mes}${anio}.pdf`;

  // Guardar PDF
  doc.save(nombreArchivo);
};


  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por mes</Card.Title>
        <div style={{ height: "100%", position: "relative" }}>
          <Line ref={chartRef} data={data} options={options} />
           <Button className="btn btn-primary mt-3" onClick={generarPDF}>
            Generar Reporte <i className="bi bi-download"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorMes;