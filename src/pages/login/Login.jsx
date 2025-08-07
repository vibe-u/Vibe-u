import { NavLink, useNavigate } from "react-router";
import { authFirebase } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import "./Login.css"; // Asegúrate de tener este archivo CSS

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        const { email, password } = data;
        try {
            await signInWithEmailAndPassword(authFirebase, email, password);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Inicio de Sesión</h2>
                <p className="login-subtitle">Ingresa tus datos para acceder a tu cuenta.</p>
                
                <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
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

                    <button type="submit" className="login-btn">Iniciar Sesión</button>
                </form>

                <NavLink to="/register" className="register-link">
                    ¿No tienes cuenta? Regístrate aquí
                </NavLink>
            </div>
        </div>
    );
};

export default Login