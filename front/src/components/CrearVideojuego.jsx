import React, { useRef } from "react";

import Form from "react-bootstrap/Form";
import { Button, Row, Col, InputGroup } from "react-bootstrap";

import { Formik, Field } from "formik";
import * as Yup from "yup";

const CrearVideojuego = () => {
  const url = import.meta.env.VITE_APP_BACKEND_URL;

  const createGame = (values) => {
    fetch(`${url}/videogames/`, {
      method: "POST",
      body: values,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };

  const schema = Yup.object().shape({
    name: Yup.string().min(3, "Titulo muy corto").required("Campo requerido"),
    description: Yup.string()
      .min(4, "Descripción muy corta")
      .required("Campo requerido"),
    image: Yup.mixed().required("Se requiere la imagen"),
    value: Yup.number().required("Campo requerido"),
    tags: Yup.string().required("Campo requerido"),
    file: Yup.mixed().required("Se requiere el archivo"),
  });

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
          createGame(JSON.stringify(values));
        }}
        initialValues={{
          name: "",
          description: "",
          image: "",
          value: "",
          tags: "",
          file: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          setFieldValue,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik03" md="5">
                <Form.Label>Título</Form.Label>
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
                  Título exitoso!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationFormik03" md="5">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripcion"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                  isValid={values.description.length > 3}
                />
                <Form.Control.Feedback type="valid">
                  Descripción exitosa!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik03" md="5">
                <Form.Label>Etiqueta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Etiqueta"
                  name="tags"
                  value={values.tags}
                  onChange={handleChange}
                  isInvalid={!!errors.tags}
                  isValid={values.tags.length > 2}
                />
                <Form.Control.Feedback type="valid">
                  Etiqueta valida!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.tags}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationFormik03" md="5">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Valor"
                  name="value"
                  value={values.value}
                  onChange={handleChange}
                  isInvalid={!!errors.value}
                  isValid={values.value.length > 1}
                />
                <Form.Control.Feedback type="valid">
                  Valor válido!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.value}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                className="mb-3"
                md="5"
                controlId="validationFormik03"
              >
                <Form.Label>Imagen</Form.Label>
                <InputGroup hasValidation>
                  <input
                    type="file"
                    name="image"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0].name);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    Imagen valida!
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group md="5" controlId="validationFormik03">
                <Form.Label>Archivo del videojuego</Form.Label>
                <InputGroup hasValidation>
                  <input
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0].name);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.file}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    Archivo valido!
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3" md="5">
              <Button type="submit" name="Crear videojuego">
                Crear videojuego
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearVideojuego;
