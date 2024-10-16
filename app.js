const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia según tu configuración
    password: '', // Cambia según tu configuración
    database: 'bicicletero'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para obtener los estudiantes
app.get('/estudiantes', (req, res) => {
    const sql = 'SELECT * FROM estudiante';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para registrar un nuevo estudiante
app.post('/registrar', (req, res) => {
    const { Rut, Nombre, ApePat, ApeMat, NombreDeUsuario, Contraseña, Correo } = req.body;

    // Validar correo electrónico
    const emailRegex = /^[\w-]+@alu\.uct\.cl$|^[\w-]+@profe\.uct\.cl$/;
    if (!emailRegex.test(Correo)) {
        return res.status(400).send('El correo no pertenece a la institución.');
    }

    // Crear el objeto del nuevo estudiante
    const nuevoEstudiante = {
        Rut,
        Nombre,
        ApePat,
        ApeMat,
        NombreDeUsuario,
        Contraseña,
        Correo
    };

    // SQL para insertar el nuevo estudiante
    const sql = 'INSERT INTO estudiante SET ?';
    db.query(sql, nuevoEstudiante, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar el estudiante.');
        }
        res.send('Estudiante registrado');
    });
});

// Configurar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
