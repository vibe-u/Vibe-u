import React, { useState, useEffect } from 'react';
import { authFirebase, dbFirebase } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css';

const Dashboard = () => {
    const [userName, setUserName] = useState("usuario");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const user = authFirebase.currentUser;
                if (user) {
                    const userDocRef = doc(dbFirebase, "Users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUserName(userDocSnap.data().name);
                    } else {
                        console.log("No se encontró el documento del usuario.");
                    }
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                setIsLoading(false);  // Asegurarse de que el estado de carga se complete
            }
        };
        fetchUserName();
    }, []); // Dependencias vacías para que solo se ejecute una vez al cargar el componente

    return (
        <section className="dashboard-section">
            <div className="dashboard-header">
                {isLoading ? (
                    <h2>Cargando...</h2> // Puedes cambiar esto por un spinner si lo prefieres
                ) : (
                    <h2>¡Bienvenido de nuevo, {userName}!</h2>
                )}
                <p>Explora lo mejor de tu comunidad universitaria.</p>
            </div>
            <div className="dashboard-grid">
                <div className="dashboard-card events-card" data-aos="fade-up">
                    <h3 className="card-title">Eventos en tu U 🎉</h3>
                    <p>Descubre los próximos eventos en tu campus y únete a la diversión.</p>
                    <button className="dashboard-btn">Ver Eventos</button>
                </div>
                <div className="dashboard-card groups-card" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="card-title">Grupos y Comunidades 🤝</h3>
                    <p>Encuentra tu tribu. Únete a clubes y comunidades con tus mismos intereses.</p>
                    <button className="dashboard-btn">Explorar Grupos</button>
                </div>
                <div className="dashboard-card matches-card" data-aos="fade-up" data-aos-delay="400">
                    <h3 className="card-title">Tus Posibles Matches 💖</h3>
                    <p>Conecta con estudiantes que comparten tu Vibe y tus metas académicas.</p>
                    <button className="dashboard-btn">Ver Matches</button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
