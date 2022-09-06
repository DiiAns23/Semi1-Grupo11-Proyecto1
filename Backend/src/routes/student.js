const { Router } = require('express');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');

const router = Router();
const student = require('../controllers/student');
// 
router.get('/', (req, res) => {
    res.send('<h1>Al parecer no se encontro nada</h1>');
})

// LOGIN
// usuario o correo y contrasenia
router.post('/login', [
    check('email', 'El usuario o correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateAtributes
    ],
    student.login    
);

// REGISTRO
// usuario, correo, contrasenia, foto
router.post('/register', [
    check('user', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('photo', 'La foto es obligatoria').not().isEmpty(),
    validateAtributes
    ],
    student.register
);



module.exports = router;