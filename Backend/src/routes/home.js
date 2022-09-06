const { Router, json } = require('express');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');

const router = Router();
const home = require('../controllers/home');

router.get('/', (req, res) => {
    res.send("Esto debio de haber salido bien");
});

// getFotoPerfil_Usuario()
// Archivos privados
// Archivos publicos
router.get('/home', home.getData)

// OPCIONES

/*
    Subir archivo
    Editar archivo
    Eliminar Archivo
    Agregar Amigo
    Ver Archivos (publicos y privados)
*/


// SUBIR ARCHIVO
/*
Seleccionar archivo
Ruta
Modificar para guardarlo
Visibilidad (publico o privado)
Contrasenia
(Unicamente imagenes, archivos de textos y pdf)
*/

router.post('/upload',[
    check('file', 'El archivo es obligatorio').not().isEmpty(),
    check('visibility', 'La visibilidad es obligatoria').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateAtributes,
], home.uploadFile);

// EDITAR ARCHIVO
/*
    Seleccionar archivo
    Cambiar visibilidad
    Contrasenia
*/

router.post('/edit',[
    check('file', 'El archivo es obligatorio').not().isEmpty(),
    check('visibility', 'La visibilidad es obligatoria').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateAtributes,
], home.editFile);

// ELIMINAR ARCHIVO
/*
    Seleccionar archivo
    Contraseña
*/

router.post('/delete',[
    check('file', 'El archivo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateAtributes,
], home.deleteFile);

// AGREGAR AMIGO


module.exports = router;