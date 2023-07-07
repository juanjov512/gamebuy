import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Button, Row, Col, InputGroup, Card, Alert } from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";

const Login = () => {
    
    const url = import.meta.env.VITE_APP_BACKEND_URL;

    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
    
    const history = useNavigate()

    //Funcion para logear usuario
    const logearUsuario = async e => {
        axios.post(`${url}/auth`, e)
          .then(function (response) {
            localStorage.setItem("auth", JSON.stringify(response.data))
            history('/inicio')
          })
          .catch(function (error) {
            setError(error.response.data);
          });
    }

    const schema = Yup.object().shape({
        userName: Yup.string()
        .min(4, "Nombre de usuario muy corto")
        .required("Campo requerido"),
        password: Yup.string()
        .min(6, "Contraseña minimo de 6 caracteres")
        .required("Campo requerido")
    });

  return (
    <Card>
        <h3>Bienvenid0!</h3>
        <Formik
            validationSchema={schema}
            onSubmit={logearUsuario}
            initialValues={{
                userName: "",
                password: "",
            }}
        >
            {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            }) => (
            <Form className="form-login" noValidate onSubmit={handleSubmit}>
                {error ? <Alert style={{width: "92%"}} variant="danger">{error}</Alert> : null}
                
                <Row className="mb-3">
                    
                <Form.Group as={Col} md="11" controlId="validationCustomUsername">
                    <Form.Label>UserName</Form.Label>
                    <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="UserName"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        isInvalid={!!errors.userName}
                        isValid={values.userName.length > 3}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.userName}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                        User Name exitoso
                    </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik03" md="11">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    isValid={values.password.length > 5}
                    />
                    <Form.Control.Feedback type="valid">
                    Contraseña exitosa!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                    {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>

                <Button type="submit">Ingresar</Button>
                
            </Form>
            )}
            
        </Formik>
        <br />
        
            
        
        
        <p>{error}</p>
    </Card>
  );
};

export default Login;
