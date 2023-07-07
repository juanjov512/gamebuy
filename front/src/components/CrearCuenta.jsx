import React from "react";

import Form from "react-bootstrap/Form";
import { Button, Row, Col, InputGroup } from "react-bootstrap";

import { Formik, Field } from "formik";
import * as Yup from "yup";

const CrearCuenta = () => {
  const url = import.meta.env.VITE_APP_BACKEND_URL;

  const createUser = (values) => {
    fetch(`${url}/users`, {
      method: "POST",
      body: values,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };

  const schema = Yup.object().shape({
    name: Yup.string().min(3, "Nombre muy corto").required("Campo requerido"),
    lastName: Yup.string()
      .min(4, "Apellido muy corto")
      .required("Campo requerido"),
    userName: Yup.string()
      .min(4, "Nombre de usuario muy corto")
      .required("Campo requerido"),
    age: Yup.number().required("Campo requerido"),
    email: Yup.string()
      .email("Correo electronico invalido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, "Contraseña minimo de 6 caracteres")
      .required("Campo requerido"),
    isPublisher: Yup.string().required(),
  });

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          createUser(JSON.stringify(values));
        }}
        initialValues={{
          name: "",
          lastName: "",
          userName: "",
          age: "",
          email: "",
          password: "",
          isPublisher: false,
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
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik03" md="4">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  isValid={values.name.length > 2}
                />
                <Form.Control.Feedback type="valid">
                  Nombre exitoso!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationFormik03" md="4">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  isValid={values.lastName.length > 3}
                />
                <Form.Control.Feedback type="valid">
                  Apellido exitoso!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                    UserName exitoso
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik03" md="8">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  isValid={
                    values.email.includes("@") &&
                    values.email.includes(".") &&
                    values.email[values.email.indexOf(".") + 1] !== undefined
                  }
                />
                <Form.Control.Feedback type="valid">
                  Email exitoso!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationFormik03" md="4">
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
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik03" md="7">
                <Row>
                  <Form.Label>Edad</Form.Label>
                  <Col className="mt" xs="8">
                    <Form.Range
                      name="age"
                      onChange={handleChange}
                      value={values.age}
                    />
                  </Col>
                  <Col xs="3">
                    <Form.Label>{values.age}</Form.Label>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  name="isPublisher"
                  label="Vendedor"
                  onChange={handleChange}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik0"
                />
              </Form.Group>
            </Row>
            <Button type="submit">Registrarme</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearCuenta;
