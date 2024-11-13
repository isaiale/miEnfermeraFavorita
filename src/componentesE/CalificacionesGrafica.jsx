import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficaSatisfaccion = () => {
    const [data, setData] = useState([0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSatisfaccion = async () => {
            try {
                const response = await fetch('https://back-end-enfermera.vercel.app/api/satisfaccion');
                
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.statusText}`);
                }

                const result = await response.json();                

                // Procesar los datos para adaptarlos a la gráfica
                const processedData = [0, 0, 0, 0, 0];
                result.forEach((entry) => {
                    if (entry._id >= 1 && entry._id <= 5) {
                        processedData[entry._id - 1] = entry.count; // Ajusta los índices según el ID
                    }
                });

                setData(processedData);
            } catch (error) {
                console.error('Error al obtener los datos de satisfacción:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSatisfaccion();
    }, []);

    const chartData = {
        labels: ['😠 Muy Insatisfecho', '😞 Insatisfecho', '😐 Neutral', '😊 Satisfecho', '😄 Muy Satisfecho'],
        datasets: [
            {
                label: 'Cantidad de Calificaciones',
                data: data, // Datos dinámicos
                backgroundColor: [
                    '#FF0000', // Rojo para Muy Insatisfecho
                    '#FFA500', // Naranja para Insatisfecho
                    '#FFFF00', // Amarillo para Neutral
                    '#90EE90', // Verde claro para Satisfecho
                    '#008000', // Verde para Muy Satisfecho
                ],
                borderColor: '#333',
                borderWidth: 2,
            },
        ],        
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true, 
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    if (loading) {
        return <p className="text-center">Cargando datos de satisfacción ... 🚀</p>;
    }

    return (
        <div className="text-center" style={{ maxWidth: '900px', margin: 'auto' }}>
            <h5 style={{marginTop:'6px', marginBottom:'2px'}}>¿Qué tan satisfecho te sentiste con tu experiencia de compra?</h5>
            <p style={{ marginBottom:'2px'}}>Basado en las calificaciones de los usuarios</p>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default GraficaSatisfaccion;
