import React from "react";
import { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const SideBar = ({ setFiltroJuegos, filtroJuegos }) => {

  const url = import.meta.env.VITE_APP_BACKEND_URL;

  const [categorias, setCategoria] = useState([]);
  const [isLoading, scategoriassLoading] = useState(true);

  useEffect(() => {
    async function llenarCategorias() {
      const response = await fetch(`${url}/tags`);
      if (response.ok) {
        const cats = await response.json();
        setCategoria(cats);
        scategoriassLoading(false);
      }
    }
    llenarCategorias();
  }, [isLoading]);

  const [precio, setPrecio] = useState(50000);

  var categoriasF = [];

  const onchangeCat = (id) => {
    var checkBox = document.getElementById(id);
    
    if (checkBox.checked === true) {
      categoriasF.push(checkBox.value);
    } else {
      categoriasF = categoriasF.filter((cat) => {
        return cat !== checkBox.value;
      });
    }
  };

  const aplicarFiltros = () => {
    //Se crear el objeto con las categorias a filtrar
    const filtros = {
      categorias: filtroJuegos.categorias
        ? categoriasF.concat(filtroJuegos.categorias)
        : categoriasF,
      precio,
    };
    setFiltroJuegos(filtros);
  };

  const limpiarFiltros = () => {
    categorias.forEach((categoria) => {
      var checkBox = document.getElementById(categoria._id);
      checkBox.checked = false;
    });
    setPrecio(50000)
    setFiltroJuegos(
      {categorias: [],
      precio:0}
    );
  };

  return (
    <div className="side-bar-contenedor">
      <p className="mt-3 h2 text-center">Filtros</p>
      <br />
      <p className="h4">Categorías:</p>
      <div className="m-2">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div >
            {categorias.map((cat) => (
              <Form.Check
                role="listaCategorias"
                key={cat._id}
                value={cat._id}
                label={cat.tag}
                id={cat._id}
                onClick={() => {
                  onchangeCat(cat._id);
                }}
              />
            ))}
            <p className="h4">Precio</p>
            <div className="m-2">
              <Form.Range
                min="50000"
                max="200000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              
              <Form.Label>$ {precio}</Form.Label>
            </div>
            <div className="text-center">
              <Button
                onClick={() => {
                  aplicarFiltros();
                }}
                role="button"
                variant="primary"
              >
                Aplicar Filtros
              </Button>
              <Button
                className="m-2"
                onClick={() => {
                  limpiarFiltros();
                }}
                role="button"
                variant="danger"
              >
                Eliminar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default SideBar;
