const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const loginRouter = require("express").Router();
const User = require("../models/user");
require("dotenv").config()

loginRouter.post("/auth", async (request, response) => {
    //Sacamos la info de request y byscamos el usuario
    const {userName, password } = request.body;
    const user = await User.findOne({userName});

    //Si el usuario no existe devuelve un error
    if (!user) return response.status(404).send("El usuario no existe");
    
    //Validamos la contraseña
    const validPassword = await validatePassword(password, user.password)
    if (!validPassword) return response.status(404).send("La contraseña es incorrecta");

    //Creamos el token de acceso
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {expiresIn: 60 * 60 * 24,});
    response.status(200).json({ auth: true, token });
});

async function validatePassword(password, passwordReal) {
    return bcrypt.compare(password, passwordReal);
}

module.exports = loginRouter;
