import React from "react";
import SideBar from "../components/SideBar";
import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"

//Se carguen los titulos en componente
describe("SideBar", () => {
    it("must display a tittle", () => {
        render(<SideBar />);    
        expect(screen.getByText(/Filtros/i)).toBeInTheDocument();
        expect(screen.getByText(/Etiquetas/i)).toBeInTheDocument();
        expect(screen.getByText(/Precio/i)).toBeInTheDocument();
    })
})

//Que el boton este
describe("SideBar", () => {
    it("must display a button", () => {
        render(<SideBar />);
        expect(screen.getByRole("button", {text: "Aplicar Filtro"})).toBeInTheDocument()
    })
})

//El arreglo de categorias tenga 9 de tamaño
describe("SideBar", () => {
    it("length of array", async () => {
        render(<SideBar />);
        expect(await screen.findAllByRole("listaCategorias")).toHaveLength(9)
    })
})