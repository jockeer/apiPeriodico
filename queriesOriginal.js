var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:posgres@localhost:5432/VTecnicas';
var db = pgp(connectionString);

// add query functions

function obtenerVisitas(req, res, next) {
    db
        .any(`select  vs.informe,vs.idvisitas, per.nombre as docente ,per.apaterno,per.amaterno,per.email,per.tel,per.foto,dc.ci,ds.nombre as empresa,vs.objetivo,vs.descripcion,vs.horasalida,vs.duracion,pr.fecha as fechaProgramada
        from programacion_destinos pr join vistias_tecnicas vs on pr.idprog=vs.idprog join materia mt on mt.idmat = pr.idmat
        join destinos ds on ds.iddestinos = pr.iddestinos join docente dc on dc.idper = pr.idper join personas per on per.idper = dc.idper`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Vistas Obtenidas!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function obtenerMat(req, res, next) {
    db.any(`SELECT * from materia;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Materias Obtenidas!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function obtenerDest(req, res, next) {
    db.any(`SELECT * from destinos;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Destinos Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function obtenerTurno(req, res, next) {
    db.any(`SELECT * from turno;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Turnos Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function obtenerSem(req, res, next) {
    db.any(`SELECT * from semestre;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Turnos Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}


function obtenerMod(req, res, next) {
    db.any(`SELECT * FROM modulos;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Modulos Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}


function obtenerAreas(req, res, next) {
    db.any(`SELECT * FROM areas;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Areas Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}


function obtenerDocente(req, res, next) {
    db.any(`SELECT per.idper,per.nombre,per.apaterno,per.amaterno,per.email,per.tel,dc.ci 
    FROM personas per join docente dc on per.idper=dc.idper
    where per.estado = 'T'`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Areas Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function obtenerProgramacion(req, res, next) {
    db.any(`select prd.idprog, prd.fecha as fechaProgramada,ds.nombre as empresa,tr.turno,sm.nombresem,sm.anio,md.modulo,ar.nombre as area,pr.nombre as docente,pr.apaterno,mt.nombre as materia
    from programacion_destinos prd JOIN destinos ds on prd.iddestinos = ds.iddestinos  join turno tr on tr.idturno =  prd.idturno
    join semestre sm on sm.idsemestre=prd.idsemestre join modulos md on md.idmodulo = prd.idmodulo join areas ar on ar.idareas= prd.idarea
    join personas pr on pr.idper = prd.idper  join docente dc on dc.idper = pr.idper join materia mt on mt.idmat = prd.idmat order by prd.idprog asc`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Programacion Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}


function InsertarProgramacion(req, res, next) {
    db.none('INSERT INTO programacion_destinos (fecha,estado,iddestinos,idturno,idsemestre,idmodulo,idarea,idper,idmat)' +
            'values(${fecha}, ${estado}, ${iddestinos}, ${idturno},${idsemestre},${idmodulo},${idarea},${idper},${idmat})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function InsertarVisistas(req, res, next) {
    db.none('INSERT INTO vistias_tecnicas(objetivo,descripcion,informe,duracion,horasalida,idprog)' +
            'values(${objetivo},${descripcion},${informe},${duracion},${horasalida},${idprog})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


//-----------------------------
function InsertarPersonas(req, res, next) {
    db.none('insert into personas (nombre,apaterno,amaterno,email,tel,foto,estado,idrol)' +
            'values(${nombre},${apaterno},${amaterno},${email},${tel},${foto},${estado},${idrol})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


//-----------------------------
function InsertarDocente(req, res, next) {
    db.none('insert into docente (ci,idper)' +
            'values(${ci},${idper})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


//-----------------------------

function InsertarAdministrador(req, res, next) {
    db.none('INSERT into administrador(jefatura,idper)' +
            'values(${jefatura},${idper})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


//-----------------------------
function obtnerMaximoId(req, res, next) {
    db.any(`SELECT MAX(idper) as idPersona FROM personas;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Maximo id!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}


function obtenerRoles(req, res, next) {
    db.any(`SELECT * from Roles;`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Roles Obtenidos!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}


//-----------------------------
function obtnerImgVistas(req, res, next) {
    let idvistas = parseInt(req.params.idvistas);
    db.any(`SELECT * FROM actividades WHERE idvisitas = ${idvistas}`)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Actividades obtenidas!'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

//-----------------------------

function InsertarActividad(req, res, next) {
    db.none('INSERT into actividades(imgact,idvisitas)' +
            'values(${imgact},${idvisitas})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

//-----------------------------
function InsertarDestinos(req, res, next) {
    db.none('insert into destinos(nombre,estado)' +
            'values(${nombre},${estado})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Insertado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function ActualizarInforme(req, res, next) {
    db.none('UPDATE vistias_tecnicas set informe = $1 WHERE idvisitas = $2', [req.body.informe,req.params.idvisitas])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Actualizado Correcatemente'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}


module.exports = {
    obtenerVisitas,
    obtenerMat,
    obtenerDest,
    obtenerTurno,
    obtenerSem,
    obtenerMod,
    obtenerAreas,
    obtenerDocente,
    InsertarProgramacion,
    obtenerProgramacion,
    InsertarVisistas,
    InsertarPersonas,
    InsertarDocente,
    InsertarAdministrador,
    obtnerMaximoId,
    obtenerRoles,
    obtnerImgVistas,
    InsertarActividad,
    InsertarDestinos,
    ActualizarInforme
  
};