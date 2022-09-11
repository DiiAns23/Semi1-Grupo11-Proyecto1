const execute_sp = require('../database/process');
const query = require('../database/query');
const sha1 = require('sha1');

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