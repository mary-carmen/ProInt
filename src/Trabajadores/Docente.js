import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                const data = await response.json();
                setDocentes(data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: docentes.map((docente) => docente.nombre), // Eje X: nombres de docentes
        datasets: [
            {
                label: 'ID de Docentes',
                data: docentes.map((docente) => docente.id), // Eje Y: IDs de docentes
                backgroundColor: docentes.map((_, index) => `hsl(${index * 360 / docentes.length}, 70%, 60%)`),
                borderColor: docentes.map((_, index) => `hsl(${index * 360 / docentes.length}, 70%, 50%)`),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h1 className="App App-link" style={{ fontWeight: 'bold', fontSize: '2rem', letterSpacing: '1px' }}>
                DOCENTES INGENIERÍA INFORMÁTICA TESSFP
            </h1>
            <div className="row">
                {docentes.map((docente, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div
                            className="card shadow-sm border-0"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)',
                                color: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: 'bold' }}>
                                    Clave ISSEMYN: <span style={{ opacity: 0.85 }}>{docente.issemyn}</span>
                                </h5>
                                <p className="card-text" style={{ opacity: 0.85 }}>
                                    <strong>ID:</strong> {docente.id}
                                </p>
                                <p className="card-text" style={{ opacity: 0.85 }}>
                                    <strong>Nombre:</strong> {docente.nombre}
                                </p>
                                <p className="card-text" style={{ opacity: 0.85 }}>
                                    <strong>Teléfono:</strong> {docente.telefono}
                                </p>
                                <p className="card-text" style={{ opacity: 0.85 }}>
                                    <strong>Sexo:</strong> {docente.sexo}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Gráfica de IDs de Docentes</h5>
                            <Bar data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaDocentes;
