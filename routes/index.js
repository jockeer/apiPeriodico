var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/obtenerUsuario/:usuario/:pass', db.obtenerUsuario);
router.get('/api/obtenerCometarios/:idnoticia', db.obtenerCometarios);
router.get('/api/obtenerUltimasCinco', db.obtenerUltimasCinco);
router.get('/api/obtenerOtrasNotas', db.obtenerOtrasNotas);
router.get('/api/obtenerUltimasCincoMontero', db.obtenerUltimasCincoMontero);
router.get('/api/obtenerOtrasNotasMontero', db.obtenerOtrasNotasMontero);
router.get('/api/obtenerUltimasCincoLocalidades', db.obtenerUltimasCincoLocalidades);
router.get('/api/obtenerOtrasNotasLocalidades', db.obtenerOtrasNotasLocalidades);
router.get('/api/obtenerUltimasCincoSantaCruz', db.obtenerUltimasCincoSantaCruz);
router.get('/api/obtenerOtrasNotasSantaCruz', db.obtenerOtrasNotasSantaCruz);
router.get('/api/obtenerUltimasCincoSeguridad', db.obtenerUltimasCincoSeguridad);
router.get('/api/obtenerOtrasNotasSeguridad', db.obtenerOtrasNotasSeguridad);
router.get('/api/obtenerUltimasCincoDeportes', db.obtenerUltimasCincoDeportes);
router.get('/api/obtenerOtrasNotasDeportes', db.obtenerOtrasNotasDeportes);
router.get('/api/obtenerUltimasCincoSociales', db.obtenerUltimasCincoSociales);
router.get('/api/obtenerOtrasNotasSociales', db.obtenerOtrasNotasSociales);
router.get('/api/obtenerUltimasCincoNacional', db.obtenerUltimasCincoNacional);
router.get('/api/obtenerOtrasNotasNacional', db.obtenerOtrasNotasNacional);
router.get('/api/obtenerUltimasCincoInternacional', db.obtenerUltimasCincoInternacional);
router.get('/api/obtenerOtrasNotasInternacional', db.obtenerOtrasNotasInternacional);

router.post('/api/IngresarNota', db.IngresarNota);
router.post('/api/IngresarComentario', db.IngresarComentario);
router.post('/api/InsertarEmpresa', db.InsertarEmpresa);
router.post('/api/InsertarPublicidad', db.InsertarPublicidad);

module.exports = router;