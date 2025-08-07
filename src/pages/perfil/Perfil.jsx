import { authFirebase } from '../../firebase';
import { useForm } from "react-hook-form";
import { dbFirebase } from "../../firebase";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


import './Perfil.css';

const Perfil = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [perfiles, setPerfiles] = useState([]);
    const [id, setId] = useState("");
    const [usuarioCorreo, setUsuarioCorreo] = useState("");

    useEffect(() => {
        const usuario = authFirebase.currentUser;
        if (usuario) {
            setUsuarioCorreo(usuario.email || "Correo no disponible");
        }
    }, []);

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
                await updateDoc(doc(dbFirebase, "perfiles", id), data);
                setId("");
                reset({ nombre: '', foto: '', bio: '' });
                toast.success("Maqueta modificada correctamente");
            } else {
                await addDoc(collection(dbFirebase, "perfiles"), data);
                reset();
                toast.success("Maqueta creada correctamente");
            }
            handleGet();
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        handleGet();
    }, []);

    const handleGet = async () => {
        const snapshot = await getDocs(collection(dbFirebase, "perfiles"));
        const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPerfiles(documentos);
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("Vas a eliminar, ¿Estás seguro?");
        if (confirmar) {
            const userDoc = doc(dbFirebase, "perfiles", id);
            await deleteDoc(userDoc);
            handleGet();
            toast.success("Maqueta eliminada correctamente");
        }
    };

    const handleEdit = (perfil) => {
        setId(perfil.id);
        reset({
            nombre: perfil.nombre,
            bio: perfil.bio
        });
        toast.success("Maqueta editada correctamente");
    };

    const [cambio, setCambio] = useState(false);
    const cambiarColor = () => {
        if (cambio) {
            document.documentElement.style.filter = 'none';
        } else {
            document.documentElement.style.filter = 'invert(1)';
        }
        setCambio(!cambio);
    };

    return (
        <main className="perfil-main">
            <section className="perfil-header">
                <p>Bienvenido - {usuarioCorreo}</p>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={cambiarColor}>
                        {cambio ? '☀️' : '🌙'}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>Salir</button>
                </div>
            </section>

            <h1 className="main-title">Gestionar Perfiles de Usuarios</h1>
            <div className="perfil-content">
                <section className="perfil-form-section">
                    <div className="form-header">
                        <h4>¡Únete a Vibe-u!</h4>
                        <p>Completa tu perfil para ser parte de la comunidad</p>
                    </div>

                    <form className="perfil-form" onSubmit={handleSubmit(handleCreate)}>
                        <div className="input-group">
                            <label>Nombre completo:</label>
                            <input type="text" placeholder="Ej: María López"
                                {...register("nombre", { required: true })} />
                            {errors.nombre && <span className="error-text">El nombre es requerido</span>}
                        </div>

                        {!id && (
                            <div className="input-group">
                                <label>Correo:</label>
                                <input type="email" placeholder="ejemplo@correo.com"
                                    {...register("correo", { required: true })} />
                                {errors.correo && <span className="error-text">El correo es requerido</span>}
                            </div>
                        )}

                        <div className="input-group">
                            <label>Foto de perfil (URL):</label>
                            <input type="url" placeholder="URL de tu foto"
                                {...register("foto", { required: true })} />
                            {errors.foto && <span className="error-text">La imagen es requerida</span>}
                        </div>

                        <div className="input-group">
                            <label>Biografía:</label>
                            <textarea placeholder="Cuéntanos de ti"
                                {...register("bio", { required: true })}></textarea>
                            {errors.bio && <span className="error-text">La bio es requerida</span>}
                        </div>

                        <button type="submit" className="submit-btn">Unirse</button>
                    </form>
                </section>

                <section className="perfiles-registrados-section">
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
            </div>
        </main>
    );
};

export default Perfil;