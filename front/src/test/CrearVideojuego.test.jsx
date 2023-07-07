import React from 'react';
import CrearVideojuego from '../components/CrearVideojuego';
import {screen, render} from "@testing-library/react";
import '@testing-library/jest-dom';

//tdd para crear el boton con nombre crear videojuego
describe("CrearVideojuego", () => {
    it("must display a button", () => {
        render(<CrearVideojuego />);
        expect(screen.getByRole('button',{name: 'Crear videojuego'})).toBeInTheDocument()
    })
})

//tdd para crear spinbutton para poner el valor de los juegos y que sea de tipo number
describe("CrearVideojuego", () => {
    it("must display a spinbutton for a game price", () => {
        render(<CrearVideojuego />);
        expect(screen.getByRole('spinbutton',{type: 'number'})).toBeInTheDocument()
    })
})

//tdd para crear los textboxts para llenar los formularios
describe("CrearVideojuego", () => {
    it("must display a textbox for a game tittle", () => {
        render(<CrearVideojuego />);
        expect(screen.getByRole('textbox',{name: 'Título Descripción Etiqueta Valor Imagen Archivo del videojuego'})).toBeInTheDocument()
    })
})