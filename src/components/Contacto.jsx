import React from "react";
import What from "../img/whatsapp.png";

function Contacto() {
  return (
    <div className="contacto">
      <div className="contenedor-contacto">
        <div className="services">
          <h1>Servicios</h1>
          <p>U;as</p>
          <p>Estampados</p>
          <h2>Agenda tu cita</h2>
        </div>
        <div className="contacto-whats">
          <a className="logo-w" href="">
            <img src={What} alt="Logo-Whats" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
