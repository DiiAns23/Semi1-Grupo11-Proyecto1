const execute_sp = require('../database/process');
const query = require('../database/query');
const sha1 = require('sha1');

const getData = async (req, res) => {
    
    // Aqui se debe de mandar a traer el username, foto, datos publicos y privados
    res.status(200).json({"msg": "ok"});
}

const uploadFile = async (req, res) => {
    // Aqui se suben los archivos del usuario
    const { id_usuario, name, file, visibility, password } = req.body;
    pass = sha1(password);
    const outcome = await execute_sp('call newPublication(?,?,?,?,?);', [
        id_usuario,
        name,
        file, 
        visibility,
        pass
    ]);
    if (outcome.err){
        res.status(400).json(outcome.err);
    }else{
        res.status(200).json(outcome.result);
    }
    return;
}

const deleteFile = async (req, res) => {
    // Aqui se eliminan los archivos del usuario
    const { id_usuario, name, password } = req.body;
    pass = sha1(password);
    const outcome = await execute_sp('call deletePublication(?,?,?);', [
        id_usuario,
        name,
        pass
    ]);
    if (outcome.err){
        res.status(400).json(outcome.err);
    }else{
        res.status(200).json(outcome.result);
    }
    return;
}

const editFile = async (req, res) => {
    // Aqui se editan los archivos del usuario
    const { id_usuario, name, new_name, visibility, password } = req.body;
    pass = sha1(password);
    const outcome = await execute_sp('call editPublication(?,?,?,?,?);', [
        id_usuario,
        name,
        new_name,
        visibility,
        pass
    ]);
    if (outcome.err){
        res.status(400).json(outcome.err);
    }else{
        res.status(200).json(outcome.result);
    }
    return;
}


const getPublications = async (req, res) => {
    // Aqui se obtienen las publicaciones del usuario
    const { id_usuario } = req.body;
    console.log("id_user_logged: ", id_usuario);
    res.status(200).json({"id_user_logged": id_usuario});

}


module.exports = {
    getData,
    uploadFile,
    editFile,
    deleteFile,
    getPublications
}