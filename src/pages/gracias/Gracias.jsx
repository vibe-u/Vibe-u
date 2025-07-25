import './Gracias.css';
import { Link } from 'react-router';

const Gracias = () => {
    return (
        <section className="gracias">
        <div className="gracias__box">
            <h1>¡Gracias por contactarnos! 💌</h1>
            <p>Hemos recibido tu mensaje y te responderemos pronto.</p>
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
        </section>
    )
};

export default Gracias;
