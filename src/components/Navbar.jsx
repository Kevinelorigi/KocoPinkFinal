import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { UilBars } from "@iconscout/react-unicons";
const auth = getAuth(firebaseApp);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const usuarioFirebase = localStorage.getItem("usuarioFirebase");

  useEffect(() => {
    if (usuarioFirebase) {
      setIsLoad(true);
    }
  }, [usuarioFirebase]);

  function logout() {
    localStorage.removeItem("usuarioFirebase");
    localStorage.removeItem("rol");
    setIsLoad(false);
    auth.signOut(signOut);
    window.location.reload();
  }

  return (
    <>
      {isLoad ? (
        <div className="menu">
          <nav className="navbar">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
              {!isOpen ? <UilBars /> : <UilBars />}
            </label>
            <label className="logo">KocoPink</label>
            <ul className="selectors">
              <li>
                <Link className="link" onClick={handleClick} to={"/index"}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleClick} to={"/contacto"}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleClick} to={"/galeria"}>
                  Galeria
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleClick} to={"/archivos"}>
                  Archivos
                </Link>
              </li>
              <li>
                <button className="input-buttom" onClick={() => logout()}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="menu">
          <nav className="navbar">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
              {!isOpen ? <UilBars /> : <UilBars />}
            </label>
            <label className="logo">KocoPink</label>
            <ul className="selectors">
              <li>
                <Link className="link" onClick={handleClick} to={"/index"}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleClick} to={"/contacto"}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleClick} to={"/galeria"}>
                  Galeria
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
