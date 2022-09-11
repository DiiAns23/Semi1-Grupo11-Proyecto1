const execute_sp = require('../database/process');
const query = require('../database/query');
const sha1 = require('sha1');
const AWS = require('aws-sdk');
const s3 = new AWS.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
);


function uploadFile(archivo ,image) {
    const foto = Buffer.from(image, 'base64');
    if (err) {
        console.log(err);
    } else {
        const parametrosPutObject = {
            Bucket: 'semi-proyecto1-g11-s22022',
            Key: archivo,
            Body: foto
        }
        s3.putObject(parametrosPutObject, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
    
};

const login = async (req, res) => {
    
    const {name, password} = req.body;
    pass = sha1(password);
    const outcome = await query.execute_sp('loginUser',{
        name,
        pass
    });
    if (outcome.err){
        res.status(400).json(outcome.err);
    } else {
        res.status(200).json(outcome.result);
    }
    return;
}

// Bucket
const uploadBucket = (foto) => {
    const date = new Date();
    const output = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const archivo = `${output}`;
    const nombre = `${s3.carpeta}/${archivo}.png`;
    const nombreC = `https://semi-proyecto1-g11-s22022.s3.us-east-2.amazonaws.com/${nombre}`;
    uploadFile(nombre, foto);
    return nombreC;

}
// REGISTRO
// usuario, correo, contrasenia, foto
const register = async (req, res) => {
    const {email, password, user, photo} = req.body;
    pass = sha1(password);

    const outcome = await query.execute_sp('newUser',{
        email,
        pass,
        user,
        photo
    });
    if (outcome.err){
        res.status(400).json(outcome.err);
    }else{
        res.status(200).json(outcome.result);
    }
    return;
}

// ENVIAR SOLICITUD DE AMISTAD
const addFriend = async (req, res) => {
    const {id_usuario_f, id_friend_f} = req.body;
    const outcome = await execute_sp('call addFriend(?,?);', [
        id_usuario_f, 
        id_friend_f
    ]);
    if (outcome.err){
        res.status(400).json(outcome.err);
    }else{
        res.status(200).json(outcome.result);
    }
    return;
}

// ACEPTAR SOLICITUD DE AMISTAD
const aceptFriend = async (req, res) => {
    const {id_usuario, id_friend} = req.body;
    const outcome = await execute_sp('call aceptFriend(?,?);', [
        id_usuario, 
        id_friend
    ]);
    if (outcome.err){
        res.status(400).json(outcome.err);
    }else{
        res.status(200).json(outcome.result);
    }
    return;
}


module.exports = {
    login,
    register,
    addFriend,
    aceptFriend
}