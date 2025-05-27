import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VentasPorEmpleado = ({ empleados, total_ventas }) => {
  // Definir los datos para el gráfico
  const data = {
    labels: empleados, // Nombres de los empleados
    datasets: [
      {
        label: "Ventas (C$)",
        data: total_ventas, // Total de ventas por mes
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
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

const chartRef = useRef(null);

const generarPDF = () => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(28, 41, 51);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Reporte de Ventas por Empleado", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

  // Capturar gráfico como imagen
  const chartInstance = chartRef.current;
  const chartCanvas = chartInstance?.canvas;
  const chartImage = chartCanvas?.toDataURL("image/png", 1.0);

  if (chartImage) {
    doc.addImage(chartImage, "PNG", 14, 40, 100, 100);
  } else {console.log("No se pudo capturar el gráfico como imagen.");}

  // Tabla de datos
  const columnas = ["Empleado", "Ventas (C$)"];
  const filas = empleados.map((empleados, index) => [empleados, total_ventas[index]]);

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
  const nombreArchivo = `VentasPorEmpleado_${dia}${mes}${anio}.pdf`;

  // Guardar PDF
  doc.save(nombreArchivo);
};



  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por empleado</Card.Title>
        <div style={{ height: "100%", position: "relative" }}>
          <Pie ref={chartRef} data={data} options={options} />
           <Button className="btn btn-primary mt-3" onClick={generarPDF}>
            Generar Reporte <i className="bi bi-download"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};   

export default VentasPorEmpleado;