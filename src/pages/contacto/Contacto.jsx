import React from 'react';

const Contacto = () => {
    // Datos de los miembros del equipo
    const teamMembers = [
        {
            name: 'Melany Perugachi',
            bio: 'Especialista en front-end, responsable del diseño de la interfaz y la experiencia de usuario.',
            photo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=MP' // URL de ejemplo, puedes usar fotos reales
        },
        {
            name: 'Santiago Vargas',
            bio: 'Desarrollador back-end, encargado de la lógica del servidor y la gestión de la base de datos.',
            photo: 'https://via.placeholder.com/150/808080/FFFFFF?text=SV'
        },
        {
            name: 'Sebastian Hidalgo',
            bio: 'Experto en la arquitectura de la aplicación, asegurando un rendimiento óptimo.',
            photo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=SH'
        },
        {
            name: 'Emilio Gavilánez',
            bio: 'Científico de datos que trabaja en los algoritmos de coincidencia de Vibe-U.',
            photo: 'https://via.placeholder.com/150/FFFF00/000000?text=EG'
        },
        {
            name: 'Jhonathan Ruiz',
            bio: 'Ingeniero de control de calidad, garantiza que la aplicación esté libre de errores.',
            photo: 'https://via.placeholder.com/150/008000/FFFFFF?text=JR'
        },
        {
            name: 'Kyara Altamirano',
            bio: 'Creadora de contenido y estratega de marketing para la comunidad Vibe-U.',
            photo: 'https://via.placeholder.com/150/FFC0CB/000000?text=KA'
        },
    ];

    return (
        <section id="contacto" className="contacto-section">
            <h2 className="contacto-title">Conoce al Equipo detrás de Vibe-U 🤝</h2>
            <p className="subtitulo">Somos un grupo de universitarios apasionados por crear conexiones auténticas.</p>
            
            {/* Espacio para la imagen grupal */}
            <div className="imagen-grupal-container">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKEyE0OxW82j8ZUiRQN2_FLSxjqVoXv7zgug&s" 
                    alt="Foto grupal del equipo Vibe-U" 
                    className="imagen-grupal" 
                />
            </div>

            <div className="equipo-container">
                {teamMembers.map((member, index) => (
                    <div key={index} className="miembro-card">
                        <img src={member.photo} alt={member.name} className="miembro-foto" />
                        <h3>{member.name}</h3>
                        <p>{member.bio}</p>
                    </div>
                ))}
            </div>

            <div className="contacto-info">
                <h3>¡Contáctanos!</h3>
                <p>Si tienes alguna pregunta o sugerencia, no dudes en escribirnos:</p>
                <p>
                    Correo: <a href="mailto:kyaramaltamirano@gmail.com">vibeu.app@gmail.com</a>
                </p>
                <p>
                    WhatsApp: <a href="https://wa.me/593963267963">+593 963 267 963</a>
                </p>
            </div>
        </section>
    );
};

export default Contacto;