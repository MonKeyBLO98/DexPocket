// Abre o crea la base de datos
/* const request = indexedDB.open('pokemonTCG', 1);  // El "1" es la versión de la base de datos

request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Crear objeto almacen para cartas
    const cartasStore = db.createObjectStore('cartas', { keyPath: 'id' });  // 'id' es la clave primaria
    cartasStore.createIndex('nombre', 'nombre', { unique: false }); // Crea un índice para buscar por nombre

    // Crear objeto almacen para usuarios
    const usuariosStore = db.createObjectStore('usuarios', { keyPath: 'id' }); // 'id' como clave primaria
    usuariosStore.createIndex('email', 'email', { unique: true }); // Index para búsquedas por correo
};

request.onerror = function(event) {
    console.error('Error al abrir la base de datos:', event.target.error);
};

request.onsuccess = function(event) {
    const db = event.target.result;
    console.log('Base de datos abierta exitosamente', db);
};
 */