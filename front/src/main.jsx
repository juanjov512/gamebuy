import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Autenticacion from "./pages/Autenticacion";
import Biblioteca from "./pages/Biblioteca";
import Videojuegos from "./pages/Videojuego"

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Autenticacion />} />
        <Route path="/inicio" element={<App />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/videojuego" element={<Videojuegos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
