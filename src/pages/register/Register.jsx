import { NavLink } from "react-router"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { authFirebase, dbFirebase } from "../../firebase";
import {setDoc, doc} from 'firebase/firestore'
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import "./Register.css"; 

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = async (data) => {
        const { email, password } = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(authFirebase, email, password);
            const user = userCredential.user;
            if (user) {
                await setDoc(doc(dbFirebase, "Users", user.uid), {
                    email: user.email,
                    name: data.name,
                    rol: "admin"
                });
            }
            navigate("/gracias");
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Únete a Vibe-U</h2>
                <p className="register-subtitle">Crea tu cuenta para empezar a conectar.</p>
                <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nombre"
                            {...register("name", { required: "El nombre es obligatorio" })}
                        />
                        {errors.name && <span className="error-text">{errors.name.message}</span>}
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email universitario"
                            {...register("email", { required: "El email es obligatorio" })}
                        />
                        {errors.email && <span className="error-text">{errors.email.message}</span>}
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                        />
                        {errors.password && <span className="error-text">{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="register-btn">Registrarse</button>
                </form>

                <NavLink to="/login" className="login-link">
                    ¿Ya tienes cuenta? Inicia sesión
                </NavLink>
            </div>
        </div>
    );
}

export default Register;