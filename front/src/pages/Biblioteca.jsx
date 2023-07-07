import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import BibliotecaItem from "../components/BibliotecaItem";

import jwt_decode from "jwt-decode";
import { Spinner } from "react-bootstrap";

const Biblioteca = () => {
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  const userToken = jwt_decode(JSON.parse(localStorage.getItem("auth")).token);

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function llenarBiblioteca() {
      const response = await fetch(`${url}/users/${userToken.id}`);
      if (response.ok) {
        const userApi = await response.json();
        setUser(userApi.purchasedGames);
        setIsLoading(false);
      }
    }
    llenarBiblioteca();
  }, [isLoading]);

  return (
    <div>
      <NavBar />
      {isLoading ? (
        <div className="m-0 vh-100 row justify-content-center align-items-center">
          <div className="col-auto p-5 text-center ">
            <Spinner animation="border" variant="danger" />
            <h2>Cargando....</h2>
          </div>
        </div>
      ) : (
        <div>
          {user.length > 0 ? (
            <BibliotecaItem 
              user={user}
            />
          ) : (
            <div className="col-auto p-5 text-center ">
              <h2>No has comprado videojuegos</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Biblioteca;
