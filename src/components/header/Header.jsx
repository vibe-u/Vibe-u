import './Header.css';
import { Link } from "react-router";
import logo from '../../assets/logo-vibe-u.png';
import { useNavigate } from "react-router"; 

const Header = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleJoinNowClick = () => {
        navigate("/register");
    };

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="Vibe-U Logo" className="logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <a href="#que-es-vibe-u">¿Qué es Vibe-U?</a>
                <a href="#como-funciona">Cómo Funciona</a>
                <a href="#explora-conecta">Explora y Conecta</a>
                <Link to="/contacto">Contacto</Link>
            </nav>
            <button className="auth-button" onClick={handleLoginClick}>
                Iniciar Sesión / Registrarse
            </button>
            <div className="header-cta-buttons">
                <a href="https://play.google.com/store/games?hl=es_EC" className="btn btn-primary">Descarga la App</a>
            </div>
            {/* Hero Text Section */}
            <div className="hero-text">
                <p>La app que pone a la U en modo social</p>
                <div className="btn-container">
                    <a href="#" className="btn" onClick={() => handleJoinNowClick()}>
                        Únete ahora
                    </a>
                    <a href="#como-funciona" className="btn btn-secondary">Cómo funciona</a>
                </div>
            </div>
        </header>
    );
}
export default Header;