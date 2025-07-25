import './Header.css';
import { Link } from "react-router";
import logo from '../../assets/logo-vibe-u.png';

const Header = ({ onOpenAuth }) => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="Vibe-U Logo" className="logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/#que-es-vibe-u">¿Qué es Vibe-U?</Link>
                <Link to="/#como-funciona">Cómo Funciona</Link>
                <Link to="/#explora-conecta">Explora y Conecta</Link>
                <Link to="/#contacto">Contacto</Link>
            </nav>
            <button className="auth-button" onClick={onOpenAuth}>Iniciar Sesión / Registrarse</button>
            <div className="header-cta-buttons">
                <a href="#descarga" className="btn btn-primary">Descarga la App</a>
            </div>
            {/* Hero Text Section */}
            <div className="hero-text">
                <p>La app que pone a la U en modo social</p>
                <div className="btn-container">
                    <a href="#" className="btn" onClick={() => onOpenAuth(false)}>Únete ahora</a>
                    <a href="#como-funciona" className="btn btn-secondary">Cómo funciona</a>
                </div>
            </div>
        </header>
    );
}
export default Header;