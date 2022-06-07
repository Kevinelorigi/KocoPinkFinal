import React, { useState, useContext } from "react";
import firebaseApp from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Index from "./Index";

const auth = getAuth(firebaseApp);

function Inicio() {
  const { dispatch } = useContext(AuthContext);

  const navegate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [type, setType] = useState("password");
  const usuarioFirebase = localStorage.getItem("usuarioFirebase");
  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        const user = userCredential.user
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Bienvenido!");
        navegate("/archivos");
       // window.location.reload();
      })
      .catch((error) => {
        toast.error("Esta cuenta no existe");
        console.log(error);
      });
  }

  function hidePassword() {
    if (hidden) {
      setHidden(false);
      setType("text");
    } else {
      setHidden(true);
      setType("password");
    }
  }

  return (
    <>
      {!usuarioFirebase ? (
        <div className="inc">
          <Toaster />
          <div className="container">
            <div className="forms">
              <div className="form login">
                <span className="title">Inicio</span>
                <form onSubmit={submitHandler} action="#">
                  <div className="input-field">
                    <input
                      type="email"
                      placeholder="Ingresa tu Email"
                      id="email"
                      required
                    />
                    <i className="uil uil-envelope" />
                  </div>
                  <div className="input-field">
                    <input
                      type={type}
                      className="password"
                      placeholder="Ingresa tu Contraseña"
                      id="password"
                      required
                    />
                    <i className="uil uil-lock" />
                    <i
                      onClick={hidePassword}
                      className={
                        type === "text"
                          ? "uil uil-eye showHidePw"
                          : "uil uil-eye-slash showHidePw"
                      }
                    />
                  </div>
                  <button type="submit" className="input-field button">
                    Ingresar
                  </button>
                </form>
                {/* <div className="login-singup">
                  <span className="text">
                    No tienes cuenta?
                    <a href="./Registro" className="text singup-text">
                      Registrarme
                    </a>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Index />
      )}
    </>
  );
}

export default Inicio;
