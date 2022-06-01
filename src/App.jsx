import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import Galeria from "./components/Galeria";
import Registro from "./components/Registro";
import NoPage from "./components/NoPage";

import Archivos from "./components/Archivos";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/admin" element={<Inicio />} />
        <Route path="/RGVtZSBwbGF0YSB5IGxlIGhhZ28gbWFzIGNvZGlnbw==" element={<Registro />} />
        <Route path="/archivos" element={<Archivos />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
