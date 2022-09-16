const execute_sp = require('../database/process');
const query = require('../database/query');
const sha1 = require('sha1');
const uploadBucket = require('../middlewares/s3bucket');

const login = async (req, res) => {
    const {name, password} = req.body;
    const pass = sha1(password);
    const outcome = await query.execute_sp('loginUser',{
        name,
        pass
    });
    if (outcome.err){
        return res.status(400).json(outcome.err);
    } else if(outcome.result) {
        return res.status(200).json(outcome.result[0][0]);
    }
    return res.status(400).json({id:-1});
}

// REGISTRO
// usuario, correo, contrasenia, foto
const register = async (req, res) => {
    const {email, password, user, photo, ext} = req.body;
    const foto = uploadBucket(photo, ext);
    const pass = sha1(password);
    const outcome = await query.execute_sp('newUser',{
        email,
        pass,
        user,
        foto
    });
    if (outcome.err){
        return res.status(400).json(outcome.err);
    }else{
        return res.status(200).json(outcome.result);
    }
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
        res.status(200).json(outcome[0]);
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
        res.status(200).json(outcome[0]);
    }
    return;
}

const getRequestFriend = async (req, res) => {
    const {id_usuario} = req.body;
    const outcome = await execute_sp('call getRequestF(?);', [
        id_usuario
    ]);
    let id_friends = [];

    for (let i = 0; i < outcome[0].length; i++) {
        if (id_usuario != outcome[0][i].id_usuario_f) {
            id_friends.push(outcome[0][i].id_usuario_f);
        } else {
            id_friends.push(outcome[0][i].id_friend_f);
    }
    }
    let data = {};
    for (let i = 0; i < id_friends.length; i++) {
        const outcome2 = await execute_sp('call getNames(?);', [
            id_friends[i]
        ]);
        data[id_friends[i]] = outcome2[0][0];
    }
    res.status(200).json(data);

}

const getFriends = async (req, res) => {
    const {id_usuario} = req.body;
    const outcome = await execute_sp('call getFriends(?);', [
        id_usuario
    ]);

    let id_friends = [];
    let friends = [];

    for (let i = 0; i < outcome[0].length; i++) {
        if (id_usuario != outcome[0][i].id_usuario_f) {
            id_friends.push(outcome[0][i].id_usuario_f);
        } else {
            id_friends.push(outcome[0][i].id_friend_f);
        }
    }
    let data = {};
    for (let i = 0; i < id_friends.length; i++) {
        const outcome2 = await execute_sp('call getNames(?);', [
            id_friends[i]
        ]);
        outcome2[0][0]['id_usuario'] = id_friends[i];
        friends.push(outcome2[0][0]);
    }
    res.status(200).json(friends);
}

const getNoFriends = async (req, res) => {
    const {id_usuario} = req.body;
    const outcome = await execute_sp('call getUsers(?);', [
        id_usuario
    ]);
    const outcome2 = await execute_sp('call getFriends(?);', [
        id_usuario
    ]);
    for (let i = 0; i < outcome[0].length; i++) {
        for (let j = 0; j < outcome2[0].length; j++) {
            if (outcome[0][i].id_usuario == outcome2[0][j].id_usuario_f || outcome[0][i].id_usuario == outcome2[0][j].id_friend_f) {
                outcome[0].splice(i, 1);
            }
        }
    }
    res.status(200).json(outcome[0]);

}

module.exports = {
    login,
    register,
    addFriend,
    aceptFriend,
    getRequestFriend,
    getFriends,
    getNoFriends
}
