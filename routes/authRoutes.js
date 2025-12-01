// =============================================
// authRoutes.js - Login funcional (texto plano)
// =============================================

// Importo express porque necesito usar su router.
// El router me permite agrupar rutas relacionadas con la autenticación.
const express = require('express');

// Importo mi modelo User, que representa la colección "usuarios" en MongoDB.
// Gracias a este modelo puedo buscar usuarios, validar datos, etc.
const User = require('../models/user'); // modelo User de MongoDB

// Creo una instancia del router de Express.
// Aquí dentro coloco todas las rutas relacionadas con la autenticación.
const router = express.Router();

//Importo la libreria jsonWebToken para generar mis tokens JWT y los gurado en jwt
const jwt = require('jsonwebtoken');

//Cargo las variables de entorno de mi fichero .env(jwt_secret y jwt_expere)
require('dotenv').config();

// Defino la ruta POST:
// POST /api/auth/login
// Esta ruta recibe usuario y contraseña desde el frontend.
// La comparo con los datos de la base de datos para validar el login.
// --------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        // Extraigo username y password que el frontend envía por JSON desde el body.
        const { username, password } = req.body;

        // Estos console.log me sirven para ver en mi consola del servidor
        // si los datos están llegando correctamente.
        //console.log("Usuario recibido:", username);
        //console.log("Contraseña recibida:", password);

        // Antes de buscar en la base de datos, verifico si llegaron vacíos.
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Por favor completa ambos campos"
            });
        }

        // Busco el usuario en la base de datos.
        // Uso .trim() por si vienen espacios accidentales.
        // User.findOne() revisa la colección "usuarios" gracias al modelo User.
        const user = await User.findOne({
            usuario: username.trim(),
            clave: password.trim()
        });

        // Imprimo qué resultado devolvió la base de datos.
        //console.log("Usuario encontrado:", user);

        // Si no encuentro usuario, devuelvo un error de credenciales.
        if (!user) {
            return res.json({
                success: false,
                message: "Credenciales incorrectas"
            });
        }

        //Genero el token jwt con los datos de la busqueda User.FindONE gurdado en  al variable user
        const payload = { id: user._id, usuario: user.usuario};
        const token = jwt.sign(payload, process.env.jwt_secret, {expiresIn: process.env.jwt_expire});

        

        // Si llego aquí, el usuario existe y las credenciales son correctas.
        // Devuelvo al frontend un JSON con los datos permitidos del usuario y el token.
        return res.json({
            success: true,
            message: "Login correcto",
            token,
            user: {
                usuario: user.usuario,
                nombre: user.nombre,
                link1: user.link1,
                link2: user.link2
            }
        });

    } catch (error) {
        // Si ocurre cualquier error inesperado (DB caída, problema interno),
        // lo capturo aquí y devuelvo un mensaje al frontend.
        console.error("Error en servidor:", error);
        return res.status(500).json({
            success: false,
            message: "Error del servidor"
        });
    }
});

// Exporto el router para poder usarlo en server.js con:
// app.use('/api/auth', authRoutes);
module.exports = router;
