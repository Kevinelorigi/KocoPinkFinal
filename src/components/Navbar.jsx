import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { UilBars } from "@iconscout/react-unicons";
const auth = getAuth(firebaseApp);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  function logout() {
    localStorage.removeItem("usuarioFirebase");
    localStorage.removeItem("rol");
    auth.signOut(signOut);
    window.location.reload();
  }

  return (
    <div className="menu">
      <nav className="navbar">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          {!isOpen ? <UilBars /> : <UilBars />}
        </label>
        <label className="logo">KocoPink</label>
        <ul className="selectors">
          <li>
            <Link onClick={handleClick} to={"/index"}>
              Inicio
            </Link>
          </li>
          {localStorage.getItem("rol") === "usuario" && (
            <>
              <li>
                <a href="#" target="_blank">
                  Contacto
                </a>
              </li>
            </>
          )}
          <li>
            <Link onClick={handleClick} to={"/galeria"}>
              Galeria
            </Link>
          </li>
          {localStorage.getItem("rol") === "Admin" && (
            <>
              <li>
                <Link onClick={handleClick} to={"/archivos"}>
                  Archivos
                </Link>
              </li>
            </>
          )}
          {!localStorage.getItem("usuarioFirebase") ? (
            <>
              <li>
                <Link to={"/inicio"}>Iniciar Sesión</Link>
              </li>
              <li>
                <Link className="active" to={"/registro"}>
                  Registro
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="input-buttom" onClick={() => logout()}>
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
