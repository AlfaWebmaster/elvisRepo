// ===========================================
// dashboard.js - Manejo de la página dashboard
// ===========================================

// Obtenemos el token y los datos del usuario desde el localStorage
const token = localStorage.getItem('token');
const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));

// Validamos que el usuario haya iniciado sesión
// Si no hay token o datos de usuario, redirigimos al login
if (!token || !datosUsuario) {
    window.location.href = "/"; // vuelve al index.html
    //return;
}

// Mostramos el nombre del usuario en el dashboard
document.getElementById("nombreUsuario").textContent = datosUsuario.nombre;

// Función para cargar todos los enlaces desde el backend
async function cargarEnlaces() {
    try {
        // Llamamos a la API /api/gpt/todos con el token en headers
        const response = await fetch('/api/gpt/todos', {
            headers: {
                'Authorization': `Bearer ${token}` // envío el token
            }
        });

        const result = await response.json();

        // Si el servidor responde correctamente
        if (result.success) {
            const contenedor = document.getElementById('listaEnlaces');
            contenedor.innerHTML = ''; // limpiamos el contenedor

            // Recorremos todos los enlaces que devuelve la API
            result.enlaces.forEach(item => {
                const a = document.createElement('a');
                a.href = item.enlace; // URL del enlace
                a.textContent = item.nombreLink; // Texto visible
                a.target = '_blank'; // abrir en nueva pestaña
                a.style.display = 'block'; // mostrar cada enlace en bloque

                // Verificamos si el usuario tiene permiso
                // item.permiso debe coincidir con la propiedad en datosUsuario
                if (!datosUsuario[item.permiso]) {
                    // Si no tiene permiso, deshabilitamos el enlace
                    a.style.pointerEvents = 'none'; // no se puede hacer click
                    a.style.color = 'gray';         // gris para indicar deshabilitado
                    a.style.textDecoration = 'line-through'; // opcional: tachado
                }

                // Agregamos el enlace al contenedor
                contenedor.appendChild(a);
            });
        }
    } catch (error) {
        console.error('Error al cargar enlaces', error);
    }
}

// Llamamos a la función para cargar los enlaces al cargar la página
cargarEnlaces();

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('datosUsuario');
    window.location.href = '/'; // volvemos al login
}

