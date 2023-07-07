import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, InputGroup, Tooltip, OverlayTrigger, Accordion, Popover } from "react-bootstrap";
import _ from "lodash";
import { FaShoppingCart } from "react-icons/fa";

const Videojuego = ({ agregarCarrito, filtroJuegos }) => {
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  
  const [games, setGames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (filtroJuegos.categorias.length === 0) {
          const response = await fetch(`${url}/videogames`);
          if (response.ok) {
            const game = await response.json();
            setGames(game);
            setIsLoading(false);
          }
        } else {
          //Traer juegos y aplicar filtros
          const response = await fetch(`${url}/videogames/filters/${filtroJuegos.categorias[0]}`);
          if (response.ok) {
            const game = await response.json();
            setGames(game);
            
            setIsLoading(false);
          }
        }
      } catch (error) {}
    }
    fetchData();
    
  }, [isLoading, filtroJuegos]);

  const popover = descripcion => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Descripción</Popover.Header>
      <Popover.Body>
        {descripcion}
      </Popover.Body>
    </Popover>
  );

  const videoGames =
    _.isUndefined(games) || _.isEmpty(games)
      ? []
      : games.map((game) => {
          const ruta = game.image;
          const rutaFilter = ruta.slice(9, ruta.length);
          
          return (
            <Row key={game._id} xs={1} md={2} className="g-4">
              <Col>
                <Card style={{ width: "18rem", margin: "10px 10px 10px 10px" }}>
                  <Card.Body>
                    <Card.Img
                      style={{ height: "8rem" }}
                      variant="top"
                      src={rutaFilter}
                    />
                    <OverlayTrigger
                      placement="bottom"
                      delay={0}
                      overlay={popover(game.description)}
                    >
                      <Card.Title className="mt-2">{game.name}</Card.Title>
                    </OverlayTrigger>
                    <Card.Text>
                      COP{" "}
                      {game.value.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </Card.Text>
                    
                    <Button
                      variant="danger"
                      style={{ width: "100%" }}
                      onClick={() => {
                        agregarCarrito(game.name, game.value, ruta, game._id);
                      }}
                    >
                      <FaShoppingCart
                        style={{ color: "white", fontSize: "20px" }}
                      />
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        });
  return videoGames;
};

export default Videojuego;
