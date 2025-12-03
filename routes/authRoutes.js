// =============================================
// authRoutes.js - Login funcional (con depuración)
// =============================================

const express = require('express');
const User = require('../models/user'); // Modelo User de MongoDB
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        // Extraigo username y password enviados por frontend
        const { username, password } = req.body;

        // Logs para depuración: qué llega al backend
        console.log('Datos recibidos en backend:', { username, password });

        // Verifico que los campos no estén vacíos
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Por favor completa ambos campos"
            });
        }

        // 🔹 Buscar solo por usuario, no por contraseña
        // Esto evita fallos si hay espacios o codificación diferente
        const user = await User.findOne({ usuario: username.trim() });

        // Log del usuario encontrado
        console.log('Usuario encontrado en DB:', user);

        if (!user) {
            return res.json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        // 🔹 Comparación de contraseña con logs de depuración
        console.log('Contraseña recibida del frontend:', JSON.stringify(password));
        console.log('Contraseña almacenada en DB:', JSON.stringify(user.clave));
        console.log('Comparación exacta:', user.clave === password.trim());

        if (user.clave !== password.trim()) {
            return res.json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        // Generar token JWT
        const payload = { id: user._id, usuario: user.usuario };
        const token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: process.env.jwt_expire });

        // Enviar respuesta al frontend
        return res.json({
            success: true,
            message: "Login correcto",
            token,
            user: {
                usuario: user.usuario,
                nombre: user.nombre,
                permisos: user.permisos
            }
        });

    } catch (error) {
        console.error("Error en servidor:", error);
        return res.status(500).json({
            success: false,
            message: "Error del servidor"
        });
    }
});

module.exports = router;
