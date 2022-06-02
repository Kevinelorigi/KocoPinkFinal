import React from "react";
import UDI from "../img/Logo-udi-web.png";
import KocoPink from "../img/EOqwLa7X4AMWWn2.jpg";

function Home() {
  return (
    <div className="hero">
      <div className="main">
        <h2>
          Calidad y elegancia hecho con <span className="love">amor!</span>
        </h2>
        <div className="image-index">
          <img src={KocoPink} alt="Principal" />
        </div>
        <div className="wrapper">
          <div className="icon facebook">
            <div className="tooltip">Facebook</div>
            <span>
              <a href="#">
                <i className="uil uil-facebook"></i>
              </a>
            </span>
          </div>
          <div className="icon instagram">
            <div className="tooltip">Instagram</div>
            <span>
              <a href="#">
                <i className="uil uil-instagram-alt"></i>
              </a>
            </span>
          </div>
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
                <p>JULIAN HERNANDEZ</p>
                <p>RONY RAMIREZ</p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
