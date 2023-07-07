import React, { useState, useEffect, useContext } from "react";
import { globalContext } from "../App";
import CarritoItem from "./CarritoItem";

import jwt_decode from "jwt-decode";

import { Offcanvas, Button, Badge, Card } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";

const CarritoCompras = ({ eliminarJuego, limpiarCarro }) => {
  const [show, setShow] = useState(false);
  const [sumaJuegos, setSuma] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let objetoJuegos = JSON.parse(localStorage.getItem("JuegosCarrito"));
  const tamaño = useContext(globalContext);

  const pagar = () => {
    const url = import.meta.env.VITE_APP_BACKEND_URL;
    const userToken = jwt_decode(
      JSON.parse(localStorage.getItem("auth")).token
    );
    var videojuegos = [];

    objetoJuegos.forEach((elemento) => videojuegos.push(elemento.id));

    fetch(`${url}/users/${userToken.id}`, {
      method: "PUT",

      body: JSON.stringify({ purchasedGames: videojuegos }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
    limpiarCarro();
  };

  useEffect(() => {
    if (objetoJuegos !== null) {
      const suma = objetoJuegos.reduce((a, b) => a + (b["value"] || 0), 0);
      setSuma(
        suma.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        })
      );
    }
  }, [objetoJuegos]);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <BsCart4 style={{ fontSize: "25px" }} />
        <Badge bg="dark"> {tamaño}</Badge>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {tamaño > 0 ? (
            objetoJuegos.map((videojuego) => {
              const rutaFilter = videojuego.imagen.slice(
                9,
                videojuego.imagen.length
              );
              return (
                <CarritoItem
                  name={videojuego.name}
                  value={videojuego.value}
                  imagen={rutaFilter}
                  eliminarJuego={eliminarJuego}
                />
              );
            })
          ) : (
            <h4>No hay videojuegos en el carrito</h4>
          )}
          {tamaño > 0 ? (
            <div>
              <h4>Precio total: {sumaJuegos} </h4>
              <Button
                style={{ width: "100%" }}
                variant="primary"
                size="lg"
                onClick={() => pagar()}
              >
                Pagar
              </Button>
            </div>
          ) : (
            <p>Sigue buscando uno que te guste!!</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CarritoCompras;
