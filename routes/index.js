var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/obtenerUsuario/:usuario/:pass', db.obtenerUsuario);
router.get('/api/obtenerCometarios/:idnoticia', db.obtenerCometarios);
router.get('/api/obtenerUltimasCinco', db.obtenerUltimasCinco);
router.get('/api/obtenerOtrasNotas', db.obtenerOtrasNotas);

router.post('/api/IngresarNota', db.IngresarNota);
router.post('/api/IngresarComentario', db.IngresarComentario);

module.exports = router;