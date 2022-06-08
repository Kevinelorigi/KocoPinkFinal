import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Contacto() {
  return (
    <div className="cuadro-contacto">
      <div className="contacto">
        <MapContainer
          center={[7.065252400654, -73.83670887388021]}
          zoom={17}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[7.065264966735722, -73.83683186556948]}></Marker>
        </MapContainer>
        <div className="contenedor-contacto">
          <div className="services">
            <h1>Servicios</h1>
            <ul>
              <li>
                <p>⭐UÑAS</p>
              </li>
              <li>
                <p>⭐ESTAMPADOS</p>
              </li>
              <li>
                <p>⭐PLANCHADO DE PELO</p>
              </li>
            </ul>
            <h2>📃Agenda tu cita</h2>
          </div>
          <div className="wrapper">
            <div className="icon whatsapp">
              <div className="tooltip">WhatsApp</div>
              <span>
                <a href="https://wa.link/rlvyce" target="_blank">
                  <i className="uil uil-whatsapp"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
