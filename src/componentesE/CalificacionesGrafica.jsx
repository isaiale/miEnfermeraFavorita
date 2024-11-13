import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalificacionesGrafica = () => {
    const [calificacionesData, setCalificacionesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCalificaciones = async () => {
            try {
                const response = await fetch('https://back-end-enfermera.vercel.app/api/satisfaccion');
                const data = await response.json();
                setCalificacionesData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos de calificaciones:", error);
                setLoading(false);
            }
        };

        fetchCalificaciones();
    }, []);

    // Formatear los datos para Chart.js
    const labels = calificacionesData.map((item) => `Calificación ${item._id}`);
    const dataCounts = calificacionesData.map((item) => item.count);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Número de Calificaciones',
                data: dataCounts,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Resultados de las Calificaciones de Satisfacción',
            },
        },
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            {loading ? (
                <p>Cargando datos de calificaciones...</p>
            ) : (
                <Bar data={chartData} options={options} />
            )}
        </div>
    );
};

export default CalificacionesGrafica;
