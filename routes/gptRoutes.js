const express = require('express');
const router = express.Router();
const Gpt = require('../models/gpt'); // modelo Gpt

// Ruta GET /api/gpt/todos
// Devuelve **todos los enlaces** de la colección
router.get('/todos', async (req, res) => {
    try {
        const enlaces = await Gpt.find({}); // Trae todos los documentos sin filtrar por permiso
        res.json({ success: true, enlaces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

module.exports = router;
