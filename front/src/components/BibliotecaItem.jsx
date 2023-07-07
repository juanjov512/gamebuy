import { React, useState, useEffect } from "react";

import { Button, Card, Row, Col, InputGroup, Tooltip, OverlayTrigger, Accordion, Popover } from "react-bootstrap";
import { BsJustify } from "react-icons/bs";

const BibliotecaItem = ({ user }) => {
  //Hacer la peticion para traer los video juegos y mostrarlos
  const url = import.meta.env.VITE_APP_BACKEND_URL;

  const [isLoading, setIsLoading] = useState(true);
  var arr = [];
  const [ju, setJu] = useState([]);
  useEffect(() => {
    async function llenarBiblioteca() {
      //Hacer ciclo para recorrer el arreglo user y traer el videojuego
      ///videogames/:id
      const response = await fetch(`${url}/videogames/${user[0]}`);
      
      if (response.ok) {
        const userApi = await response.json();
        setJu(userApi)
        console.log(ju)
        setIsLoading(false);
      }
    }
    llenarBiblioteca();
  }, [isLoading]);

  const popover = descripcion => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Descripción</Popover.Header>
      <Popover.Body>
        {descripcion}
      </Popover.Body>
    </Popover>
  );

  
  return (
    <div>
      <h2 className="mt-4 text-center">Biblioteca de juegos comprados</h2>
      <br />
      <div className="m-5">
        <h2>Juegos comprados</h2>
        <div>
          {isLoading ? 
            ( 
              <p>Cargando...</p> 
            
            ) 
          
          : (
            <div>
              
              <Card style={{ width: "18rem", margin: "10px 10px 10px 10px" }}>
            <Card.Body>
              <Card.Img
                style={{ height: "8rem" }}
                variant="top"
                src="src\public\img\1650335210665-cyberpunkvideo02.jpeg"
              />
              <OverlayTrigger
                placement="bottom"
                delay={0}
                overlay={popover(ju.description)}
              >
                <Card.Title className="mt-2">{ju.name}</Card.Title>
              </OverlayTrigger>
              <Card.Text>
                COP{" "}
                {ju.value.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </Card.Text>
            </Card.Body>
          </Card>
            
          
          </div>
            
          )}
          
          
        </div>
      </div>
    </div>
  );
};

export default BibliotecaItem;
