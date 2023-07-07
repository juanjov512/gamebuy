import React from "react";
import Videojuego from "../components/CrearVideojuego";

import Form from "react-bootstrap/Form";
import { Button, Row, Col, InputGroup, Container, Modal, Card } from "react-bootstrap";

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Videojuegos = () => {
    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Row>
                    <Col>
                        <Videojuego />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Videojuegos;
