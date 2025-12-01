//Servidor Express

// Importo el framework Express, que me permite crear un servidor web de forma sencilla.
const express = require('express');

// Importo mi función de conexión a MongoDB, que está definida en connectDB.js.
// Gracias a esta función podré conectar mi servidor a la base de datos.
const { connectionDb } = require('./connectDB');

// Importo 'path', que me permite manejar rutas de archivos dentro del proyecto.
const path = require('path');

// Aquí **podría** requerir el modelo User, pero no es obligatorio que esté aquí cargado,
// porque lo utilizo directamente dentro de las rutas.
// Por eso lo dejo comentado:
// require('./models/user.js');

// Importo las rutas de autenticación (login).
// Todo lo relacionado con /api/auth estará dentro del archivo authRoutes.js.
const authRoutes = require('./routes/authRoutes.js');
const gptRoutes = require('./routes/gptRoutes.js');




// =============================================
// CONFIGURACIÓN INICIAL DEL SERVIDOR
// =============================================

// Creo la aplicación Express (mi servidor).
const app = express();

app.use('/api/gpt', gptRoutes);

// Defino el puerto donde va a funcionar el servidor.
const port = 3000;


// =============================================
// MIDDLEWARES (funciones que se ejecutan antes de las rutas)
// =============================================

// Este middleware convierte el body de las peticiones con JSON en un objeto JS.
// Es necesario para poder leer req.body.
app.use(express.json());

// Sirvo archivos estáticos desde la carpeta "public".
// Eso significa que todo lo que ponga en /public (html, css, js, imágenes)
// estará disponible desde el navegador.
app.use(express.static('public'));


// =============================================
// CONEXIÓN A LA BASE DE DATOS
// =============================================

// Ejecuto la función que conecta a MongoDB Atlas.
// Esta función está definida en connectDB.js y usa mongoose.connect()
connectionDb();


// =============================================
// RUTA PRINCIPAL
// =============================================

// Cuando alguien entra en http://localhost:3000/
// le envío el archivo index.html que está en la raíz del proyecto.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// =============================================
// RUTAS DE AUTENTICACIÓN
// =============================================

// Aquí le digo a Express:
// “Todo lo que empiece por /api/auth será manejado
// por lo que está dentro de authRoutes.js”
app.use('/api/auth', authRoutes);


// =============================================
// INICIAR EL SERVIDOR
// =============================================

app.listen(port, () => {
    console.log(`🚀 Servidor ejecutándose en: http://localhost:${port}`);
    console.log(`👤 Usuarios de prueba: usu1/1234 o usu2/1234`);
});
