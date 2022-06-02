import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Contacto() {
  return (
    <div className="contacto">
      <MapContainer
        center={[7.065310889674422, -73.83886154743772]}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[7.0653747738743675, -73.83881863209552]}></Marker>
      </MapContainer>
      <div className="contenedor-contacto">
        <div className="services">
          <h1>Servicios</h1>
          <ul>
            <li>
              <p>UÑAS</p>
            </li>
            <li>
              <p>ESTAMPADOS</p>
            </li>
          </ul>
          <h2>Agenda tu cita</h2>
        </div>
        <div className="wrapper">
          <div className="icon whatsapp">
            <div className="tooltip">WhatsApp</div>
            <span>
              <a href="">
                <i className="uil uil-whatsapp"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
