import React, { useRef } from 'react';
import firebaseApp, { crearUsuario } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateCurrentUser } from "firebase/auth"
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const auth = getAuth(firebaseApp);
//import uniqid from 'uniqid';

function Registro() {
  const captcha = useRef()
  const navegate = useNavigate()
  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (captcha.current.getValue()) {
      await createUserWithEmailAndPassword(auth, email, password).then((user) => {
        captcha.current.reset()
        toast.success('Registrado Correctamente!')
        navegate("/index");
      }).catch((error) => {
        toast.error("El correo ya se encuentra en uso")
      })
      await crearUsuario(email, 'usuario', password)
    } else {
      toast.error("Debes confirmar que no eres ROBOT!", {
        duration: 1000,
      })
    }
  }
  

  return (
    <div className="res" >
      <Toaster />
      <div className="container">
        <div className="forms">
          <div className="form login">
            <span className="title">Registro</span>
            <form onSubmit={submitHandler}
              id="singup-form">
              <div className="input-field">
                <input type="email" placeholder="Ingresa tu Email" id="email" required />
                <i className="uil uil-envelope" />
              </div>
              <div className="input-field">
                <input type="password" className="password" id="password" placeholder="Ingresa tu Contraseña" required />
                <i className="uil uil-lock" />
                <i className="uil uil-eye-slash showHidePw" />
              </div>
              <div className='capchats'>
                <ReCAPTCHA
                  ref={captcha}                
                  sitekey="6LeLlxcgAAAAANwNlB2B7Kpuz8RG_UwtBZcUsrLO"
                />
              </div>

              <button type="submit" className="input-field button">
                Registrarme
              </button>
            </form>
            <div className="login-singup">
              <span className="text">
                <a href="./Inicio" className="text singup-text">Inicio</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Registro;