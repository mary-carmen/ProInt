import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);

    // Definimos un arreglo de colores
    const colores = [
        '#a8dadc', '#f4a261', '#2a9d8f', '#e9c46a', '#264653', 
        '#ffb4a2', '#9a8c98', '#e76f51', '#457b9d', '#c9ada7'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
                const data = await response.json();
                setAlumnos(data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    const calcularPromedio = (practicas) => {
        const notas = Object.values(practicas).map(Number);
        const suma = notas.reduce((a, b) => a + b, 0);
        return (suma / notas.length).toFixed(2);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: '2rem', letterSpacing: '1px' }}>
                CALIFICACIONES DEL ING. ALEX RAMÍREZ GALINDO
            </h1>
            <div className="row">
                {alumnos.map((alumno, index) => {
                    const practicas = alumno.practicas;
                    const promedio = calcularPromedio(practicas);
                    const aprobado = promedio >= 7;

                    const chartData = {
                        labels: Object.keys(practicas),
                        datasets: [
                            {
                                label: 'Promedio de Calificaciones',
                                data: Object.values(practicas).map(Number),
                                // Asignamos un color distinto a cada estudiante
                                backgroundColor: colores[index % colores.length],
                            },
                        ],
                    };

                    return (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <strong>ID:</strong> {alumno.id}
                                    </h5>
                                    <p className="card-text"><strong>Cuenta:</strong> {alumno.cuenta}</p>
                                    <p className="card-text"><strong>Nombre:</strong> {alumno.nombre}</p>
                                    <Bar data={chartData} />
                                    <div className="text-center mt-3">
                                        <button className={`btn ${aprobado ? 'btn-success' : 'btn-danger'}`}>
                                            {aprobado ? 'Aprobado' : 'Reprobado'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListaAlumnos;
