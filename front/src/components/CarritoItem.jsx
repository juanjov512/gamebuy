import React from "react";
import imagen2 from "../img/cbrpk.jpg";
import {
  Offcanvas,
  Button,
  Badge,
  Card,
} from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";

const CarritoItem = ({name, value, imagen, eliminarJuego}) => {
    
  return (
    <Card className="shadow p-3 mb-4" style={{ width: "100%" }}>
      <Card.Body>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                    <div>
                        <img src={imagen2} alt="imagen" className="img-fluid rounded-3" style={{width: "85px"}} />
                    </div>
                    <div className="ms-3">
                        <h5>{name}</h5>
                        <h5 className="mb-0">
                            {value.toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP"
                            })}
                        </h5>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <Button variant="link">
                        <AiOutlineDelete
                            style={{ fontSize: "2em", color: "var(--rojo)"  }}
                            onClick={() => eliminarJuego(name)}
                        />
                    </Button>
                </div>
            </div>
      </Card.Body>
    </Card>
  );
};

export default CarritoItem;
