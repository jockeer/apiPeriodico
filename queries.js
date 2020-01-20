var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

// var connectionString = 'postgres://postgres:posgres@localhost:5432/ZonaNuevoNorte';
var connectionString = 'postgres://khpyzscwcpngyb:c4efda34ee0e93f087d50aba3055b56d73d840bf30c02fdb2d7066132ef695a4@ec2-174-129-33-147.compute-1.amazonaws.com:5432/dbcouaatp3hrtk';
var db = pgp(connectionString);

//Hola mundo
// add query functions

function obtenerUsuario(req, res, next) {
    let usuario = req.params.usuario;
    let pass = req.params.pass;
    db.any(`SELECT * FROM usuario WHERE usuario = '${usuario}' and pass = '${pass}'`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'usuario Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerEmpresas(req, res, next) {
    db.any(`SELECT * from empresa`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'usuario Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerPublicidades(req, res, next) {
    db.any(`SELECT pu.idpublicidad,pu.foto,pu.estado,pu.tipo,e.nombreempresa,ca.nombrecategoria from publicidad pu INNER JOIN empresa e on(pu.idempresa=e.idempresa) INNER JOIN categoria ca on(pu.idcategoria=ca.idcategoria)`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'usuario Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCinco(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.notalarga,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotas(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.notalarga,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC LIMIT 5) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoMontero(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 1 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasMontero(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=1 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoLocalidades(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 2 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasLocalidades(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=2 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoSantaCruz(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 3 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasSantaCruz(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=3 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoSeguridad(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 4 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasSeguridad(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=4 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoDeportes(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 5 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasDeportes(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=5 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoSociales(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 6 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasSociales(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=6 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoNacional(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 7 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasNacional(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=7 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerUltimasCincoInternacional(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n,subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria = 8 ORDER BY idnoticia DESC LIMIT 5`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerOtrasNotasInternacional(req, res, next) {
    db.any(`SELECT n.idnoticia,n.titulo,n.subtitulo,n.texto,n.fotografia,n.frase,n.fecha,ca.nombrecategoria,u.nombres,u.apellidos from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) INNER JOIN usuario u on(n.idusu = u.idusu) WHERE n.idcategoria=8 and idnoticia not IN (SELECT n.idnoticia from Noticia n INNER JOIN categoria ca on(n.idcategoria = ca.idcategoria) ORDER BY idnoticia DESC) ORDER BY idnoticia DESC Limit 10`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Noticia Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}
function obtenerCometarios(req, res, next) {
    let idnoticia = req.params.idnoticia;
    db.any(`SELECT * FROM comentario where idnoticia=${idnoticia}`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Cometario Obtenido'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function IngresarNota(req, res, next) {
    db.none('insert into Noticia(titulo,subtitulo,texto,notalarga,fotografia,frase,fecha,idCategoria,idUsu) values(${titulo},${subtitulo},${texto},${notalarga},${fotografia},${frase},${fecha},${idCategoria},${idUsu})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Registrado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function IngresarComentario(req, res, next) {
    db.none('INSERT INTO comentario(texto,nombrepersona,fecha,idnoticia)VALUES(${texto},${nombrepersona},${fecha},${idnoticia})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Registrado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function InsertarEmpresa(req, res, next) {
    db.none('INSERT into empresa(nombreEmpresa)VALUES(${nombreEmpresa})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Registrado Correctamente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function InsertarPublicidad(req, res, next) {
    db.none('insert into publicidad(foto,estado,tipo,idEmpresa,idCategoria)VALUES(${foto},${estado},${tipo},${idEmpresa},${idCategoria})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Registrado Correctamente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}



module.exports = {
    obtenerUsuario,
    obtenerUltimasCinco,
    obtenerOtrasNotas,
    obtenerUltimasCincoMontero,
    obtenerOtrasNotasMontero,
    obtenerUltimasCincoLocalidades,
    obtenerOtrasNotasLocalidades,
    obtenerUltimasCincoSantaCruz,
    obtenerOtrasNotasSantaCruz,
    obtenerUltimasCincoSeguridad,
    obtenerOtrasNotasSeguridad,
    obtenerUltimasCincoDeportes,
    obtenerOtrasNotasDeportes,
    obtenerUltimasCincoSociales,
    obtenerOtrasNotasSociales,
    obtenerUltimasCincoNacional,
    obtenerOtrasNotasNacional,
    obtenerUltimasCincoInternacional,
    obtenerOtrasNotasInternacional,
    obtenerCometarios,
    obtenerEmpresas,
    obtenerPublicidades,
    IngresarNota,
    IngresarComentario,
    InsertarEmpresa,
    InsertarPublicidad
};

