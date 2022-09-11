const { Router } = require('express');
const { check } = require('express-validator');
require('dotenv').config();
const validateAtributes = require('../middlewares/validateAtributes');
const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
);

const router = Router();
const student = require('../controllers/student');
// 
router.get('/', (req, res) => {
    res.send('<h1>Al parecer no se encontro nada</h1>');
})

// LOGIN
// usuario o correo y contrasenia
router.post('/login', [
    check('name', 'El usuario o correo es obligatorio').not().isEmpty(),
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

router.post('/addFriend', [
    check('id_usuario_f', 'El id es obligatorio').isInt(),
    check('id_friend_f', 'El id del amigo es obligatorio').isInt(),
    validateAtributes
    ], student.addFriend);


router.post('/aceptFriend', [
    check('id_usuario', 'El id es obligatorio').isInt(),
    check('id_friend', 'El id del amigo es obligatorio').isInt(),
    validateAtributes
    ], student.aceptFriend);  
    
// s3.listBuckets(function(err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.Buckets);
//     }
// });


// let parametrosGetObject = {
//     Bucket: 'semi-proyecto1-g11-s22022',
//     Key: 'node.png'
// }
// s3.getObject(parametrosGetObject, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//         fs.writeFile("src/images/prueba.png", data.Body, 'binary', (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("Archivo creado");
//             }
//         })
//     }
// });






module.exports = router;