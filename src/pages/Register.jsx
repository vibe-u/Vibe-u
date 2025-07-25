import { NavLink } from "react-router"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { authFirebase, dbFirebase } from "../firebase";
import {setDoc, doc} from 'firebase/firestore'
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form";

const Register = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    
    const handleRegister = async (data) => {
        const {email,password} = data
        try {
            await createUserWithEmailAndPassword(authFirebase, email, password)
            const user = authFirebase.currentUser
            console.log(user)
            if (user){
                await setDoc(doc(dbFirebase,"Users",user.uid),{
                    email:user.email,
                    name:data.name,
                    rol:"admin"
                })
            }
            navigate("/login")
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <input type="text" placeholder="Nombre" {...register("name", { required: true })} />
            {errors.name && <span>El nombre es obligatorio</span>}

            <input type="email" placeholder="Email" {...register("email", { required: true })} />
            {errors.email && <span>El email es obligatorio</span>}

            <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
            {errors.password && <span>La contraseña es obligatoria</span>}

            <button type="submit">Registrarse</button>

            <NavLink to="/login">¿Ya tienes cuenta? Inicia sesión</NavLink>
        </form>
    )
}

export default Register
