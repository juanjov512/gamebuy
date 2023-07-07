import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";
import { FaGamepad } from "react-icons/fa";

import CarritoCompras from "./CarritoCompras";

const NavBar = ({ eliminarJuego, limpiarCarro }) => {

  let navegacion = useNavigate();

  const cerrarSesion = () => {
    const objeto = {
      auth: false,
      token: ""
    }
    localStorage.setItem("auth", JSON.stringify(objeto))
    navegacion('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand={false}>
      <Container>
        <Navbar.Brand href="/inicio">
          <FaGamepad style={{ fontSize: "35px", marginRight: "0.2em"}} />
          GameBuy
        </Navbar.Brand>
        <Nav.Link style={{color:"white"}} href="/inicio">Inicio</Nav.Link>
        <Nav.Link style={{color:"white"}} href="/biblioteca">Mi biblioteca</Nav.Link>
        <CarritoCompras
          eliminarJuego={eliminarJuego}
          limpiarCarro={limpiarCarro}
        />
        <Nav.Link style={{color:"white"}} onClick={() => cerrarSesion()}>Cerrar sesión</Nav.Link>
      </Container>
    </Navbar>
  );
};

export default NavBar;
