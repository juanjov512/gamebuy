import React from "react";
import CrearCuenta from "../components/CrearCuenta";
import Login from "../components/Login";

import { Button, Row, Col, InputGroup, Container, Modal, Card } from "react-bootstrap";

import { useState } from "react";

const Autenticacion = (props) => {
    //Modificador de estado de visibilidad para el formulario crear cuenta
    const [visCrearCuenta, setVisCrearCuenta] = useState(false);

    const handleClose = () => setVisCrearCuenta(false);
    const handleShow = () => setVisCrearCuenta(true);

    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Row>
                    <Col className="col-login"> 
                        <Login />
                        <p>No tienes una cuenta? <span onClick={() => {setVisCrearCuenta(!visCrearCuenta)}}>Crear cuenta</span> </p>
                    </Col>
                </Row>
                <Modal show={visCrearCuenta} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><CrearCuenta /></Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default Autenticacion;
