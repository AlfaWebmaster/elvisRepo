

// Función principal que se ejecuta cuando el usuario hace click en "Ingresar"
async function loginUsuario() {  
    // Obtengo los valores que el usuario escribió en los campos del HTML
    const username = document.getElementById('usu').value; // campo usuario
    const password = document.getElementById('clave').value; // campo contraseña
    const message = document.getElementById('message'); // div donde mostraré mensajes
    

    // Verifico que los campos no estén vacíos
    if (!username || !password){
        // Si falta alguno, muestro un mensaje de error en rojo
        message.innerHTML = '<p style="color: red;">Por favor completa los campos Usuario y Contraseña </p>';
        return; // salgo de la función para no seguir ejecutando
    }

    // Muestro mensaje de carga mientras envío los datos al servidor
    message.innerHTML = '<p style="color: blue;">Cargando credenciales.....</p>';

    try {
        // Envío los datos al servidor mediante fetch, usando método POST
        const response = await fetch('/api/auth/login', {
             method: 'POST', 
             headers: {
                'Content-Type': 'application/json' // Indico que envío JSON
             },
             body: JSON.stringify({
                username: username, // envío el nombre de usuario
                password: password  // envío la contraseña
             })
        });
        
        // Recibo la respuesta del servidor y la convierto a un objeto JavaScript
        const result = await response.json();
        
        // Muestro el resultado según lo que devuelva el backend
        if (result.success) { 
            // Guardo el token en localStorage para usarlo después en otras peticiones
            localStorage.setItem('token', result.token);
            localStorage.setItem('datosUsuario', JSON.stringify(result.user));

            //Opcional
            // Si login correcto, muestro mensaje de bienvenida con el nombre del usuario
            message.innerHTML = `<p style="color: green;">Bienvenido, <strong>${result.user.nombre}</strong></p>`;

            window.location.href = "dashboard.html";
                //Cargar enlaces permitidos segun tenemos en la base de datos
              //Este trozo de codigo quitamos por que ya no sirve al menos para aqui
              /*
                if(result.user.link1 === true){
                    cargarEnlaces("link1", result.token);
                }

                if(result.user.link2 === true){
                    cargarEnlaces("link2", result.token);
                }
            */

            
        } else {
            // Si login fallido, muestro mensaje de error
            message.innerHTML = '<p>Error en el login</p>';
        }
    } catch (error) {
        // Si falla la conexión o ocurre un error, muestro mensaje de fallo de conexión
        message.innerHTML = '<p>Fallo en la conexión</p>';
    }
}

