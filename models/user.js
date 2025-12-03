// Importo mongoose porque lo necesito para crear esquemas (schemas) y modelos.
// Los modelos representan cómo se almacenan los datos dentro de mi base de datos MongoDB.
const mongoose = require('mongoose');


// Aquí defino el esquema de mi colección de usuarios.
// Este esquema marca la estructura que debe tener cada documento dentro de la colección.
// Lo hago simple: cada campo tiene un tipo de dato y mongoose ya entiende el resto.
const userSchema = new mongoose.Schema({

    // Este es el campo del nombre de usuario que uso en el login.
    // En la base de datos existe exactamente igual.
    usuario: {type: String, required: true},

    // Esta es la contraseña. Más adelante la cifraré, pero ahora mismo la guardo como texto.
    clave: {type: String, required: true},

    // Este es el nombre real del usuario, lo saco en el login para mostrar un saludo.
    nombre: {type: String, required: true},

    // Estos dos campos son booleanos y me servirán para dar permisos a ciertas partes del frontend.
    //link1: Boolean,
    //link2: Boolean

    //Campo modificado a Array
    permisos: [{type: String}] //Array que contiene string de los links1 al link4
    

// Aquí le especifico explícitamente el nombre de la colección donde están los usuarios.
// MongoDB por defecto pluraliza los nombres, pero yo quiero que use “usuarios” tal cual,
// porque así se llama mi colección real en Mongo Atlas.
}, { collection: 'usuarios' });


// Exporto el modelo. Le doy el nombre 'User' y le paso el esquema.
// Este modelo lo importo en authRoutes.js para poder buscar usuarios en la BD.
module.exports = mongoose.model('User', userSchema);
