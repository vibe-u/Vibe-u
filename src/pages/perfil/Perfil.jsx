import { authFirebase } from '../../firebase';
import { useForm } from "react-hook-form";
import { dbFirebase } from "../../firebase";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

import './Perfil.css';

const Perfil = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [perfiles, setPerfiles] = useState([]);
    const [id, setId] = useState("")


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
            if (id) {
                await updateDoc(doc(dbFirebase, "perfiles", id), data)
                setId("")
                reset({
                    nombre: '',
                    foto: '',
                    bio: ''
                })
            }
            else {
                await addDoc(collection(dbFirebase, "perfiles"), data)
                reset()
            }
            handleGet()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGet()
    }, [])

    const handleGet = async () => {
        const snapshot = await getDocs(collection(dbFirebase, "perfiles"));
        const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setPerfiles(documentos)
    }
    const handleDelete = async (id) => {
        const confirmar = confirm("Vas a eliminar, ¿Estás seguro?")
        if (confirmar){
            const userDoc = doc(dbFirebase, "perfiles", id)
            await deleteDoc(userDoc)
            handleGet()
        }
    }
    const handleEdit = (perfiles) => {
        setId(perfiles.id)
        reset({
            nombre: perfiles.nombre,
            foto: perfiles.foto,
            bio: perfiles.bio
        })
    }
    const [cambio, setCambio] = useState(false);
    const cambiarColor = () => {
        if (cambio) {
            document.documentElement.style.filter = 'none';
        } else {
            document.documentElement.style.filter = 'invert(1)';
        }
        setCambio(!cambio);
    };
    

    useEffect(() => {
        handleGet()
    }, [])


    return (
        <main>
            <section className="header_projects">
                <p>Bienvenido - {perfiles.nombre}</p>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={cambiarColor}>
                    {cambio ? '☀️' : '🌙'}
                    </button>
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
                                    <div className="route-actions">
                                        <button className="update-btn" onClick={() => handleEdit(perfil)}>Actualizar</button>
                                        <button className="delete-btn" onClick={() => handleDelete(perfil.id)}>Eliminar</button>
                                    </div>
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
