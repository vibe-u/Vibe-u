import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Gracias from "./pages/gracias/Gracias";
import Perfil from "./pages/perfil/Perfil";
import Contacto from "./pages/Contacto";
import { useEffect } from "react";
import AOS from "aos";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="gracias" element={<Gracias />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="contacto" element={<Contacto />} />

      </Routes>
      
    </BrowserRouter>

  )
}

export default App;
