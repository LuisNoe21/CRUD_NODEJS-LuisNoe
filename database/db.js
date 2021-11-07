//2 - Invocamos a MySQL y realizamos la conexion
const mysql = require('mysql');
const conexion = mysql.createConnection({
    host     : 'localhost',
    user     : 'devuser',
    password : '123ABcd.',
    database : 'luis_rodriguez_db'  
});

conexion.connect((error)=>{
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('¡Conectado a la Base de Datos!');
  });

  module.exports = conexion;
