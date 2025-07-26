import { authFirebase } from '../../firebase';
import { useForm } from "react-hook-form";
import { dbFirebase } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import './Perfil.css';

const Perfil = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [perfiles, setPerfiles] = useState([]);

    const handleLogout = async () => {
        try {
            await authFirebase.signOut();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreate = async (data) => {
        try {
            await addDoc(collection(dbFirebase, "perfiles"), data);
            reset();
            fetchPerfiles(); // recarga la lista después de crear uno nuevo
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPerfiles = async () => {
        try {
            const querySnapshot = await getDocs(collection(dbFirebase, "perfiles"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPerfiles(data);
        } catch (error) {
            console.log("Error al obtener perfiles:", error);
        }
    };

    useEffect(() => {
        fetchPerfiles();
    }, []);

    return (
        <main>
            <section className="header_projects">
                <p>Bienvenido - </p>
                <div className="header-actions">
                    <button className="theme-toggle">🌙</button>
                    <button className="logout-btn" onClick={handleLogout}>Salir</button>
                </div>
            </section>

            <section className="container_projects">
                <section className="form-section">
                    <h4>Unirse a Vibe-u</h4>
                    <p>Completa tu perfil para unirte a la comunidad</p>

                    <form className="route-form" onSubmit={handleSubmit(handleCreate)}>

                        <label>Nombre completo:</label>
                        <input type="text" placeholder="Ej: María López"
                            {...register("nombre", { required: true })}
                        />
                        {errors.nombre && <span className="errors">El nombre es requerido</span>}

                        <label>Correo:</label>
                        <input type="email" placeholder="ejemplo@correo.com"
                            {...register("correo", { required: true })}
                        />
                        {errors.correo && <span className="errors">El correo es requerido</span>}

                        <label>Foto de perfil (URL):</label>
                        <input type="url" placeholder="URL de tu foto"
                            {...register("foto", { required: true })}
                        />
                        {errors.foto && <span className="errors">La imagen es requerida</span>}

                        <label>Biografía:</label>
                        <textarea placeholder="Cuéntanos de ti"
                            {...register("bio", { required: true })}
                        />
                        {errors.bio && <span className="errors">La bio es requerida</span>}

                        <input className="btn" type="submit" value="Unirse" />
                    </form>
                </section>

                <section className="routes-section">
                    <h4>Perfiles registrados</h4>
                    <div className="usuarios-list">
                        {perfiles.length === 0 ? (
                            <p>No hay perfiles aún.</p>
                        ) : (
                            perfiles.map(perfil => (
                                <div key={perfil.id} className="usuario-card" data-aos="fade-up">
                                    <img src={perfil.foto} alt={perfil.nombre} className="foto-perfil" />
                                    <h4>{perfil.nombre}</h4>
                                    <p>{perfil.bio}</p>
                                </div>

                            ))
                        )}
                    </div>
                </section>
            </section>
        </main>
    );
};

export default Perfil;
