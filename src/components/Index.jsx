import React from "react";
import UDI from "../img/Logo-udi-web.png";
import KocoPink from "../img/EOqwLa7X4AMWWn2.jpg";

function Home() {
  return (
    <div className="hero">
      <div className="main">
        < h2>
          Calidad y elegancia hecho con <span className="love">amor!</span>
        </h2>
        <div className="image-index">
          <img src={KocoPink} alt="Principal" />
        </div>
      </div>
      <footer className="footer">
        <h1>Desarrollado</h1>
        <div className="footer-flex">
          <div className="image-udi">
            <img src={UDI} alt="Logo-UDI" />
          </div>
          <div className="personas">
            <ul className="list">
              <li>
                <p>KEVIN VEGA</p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
