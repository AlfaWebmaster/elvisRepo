// Importo mongoose, que es la librería que uso para conectarme a MongoDB
// y para trabajar con modelos y esquemas.
const mongoose = require('mongoose');

// Cargo las variables de entorno definidas en el archivo .env.
// Aquí es donde tengo guardada mi cadena de conexión MONGO_URI,
// así no la escribo directamente en el código.
require('dotenv').config();


// Creo una función asíncrona que será la encargada de conectar mi servidor
// con la base de datos MongoDB Atlas.
const connectionDb = async () => {
    try {
        // Uso mongoose.connect() y le paso la URI de mi base de datos.
        // process.env.MONGO_URI viene del archivo .env.
        // Este "await" hace que el servidor espere hasta que haya conexión.
        await mongoose.connect(process.env.MONGO_URI);

        // Si todo va bien, muestro estos mensajes en la consola del servidor.
        console.log('Base de datos conectada');
        console.log('Esperando datos del html');
    } catch (error) {
        // Si ocurre un error al conectar, lo muestro en consola.
        console.error(error);

        // Lanzo un nuevo error para que el servidor sepa que la conexión falló.
        throw new Error("Error connecting to DB");
    }
}

// Exporto la función para poder usarla en server.js.
// Allí la llamo antes de levantar el servidor.
module.exports = { connectionDb };
