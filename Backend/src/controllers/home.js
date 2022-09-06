const getData = async (req, res) => {
    
    // Aqui se debe de mandar a traer el username, foto, datos publicos y privados
    res.status(200).json({"msg": "ok"});
}

const uploadFile = async (req, res) => {
    // Aqui se suben los archivos del usuario
    res.status(200).json({"msg": "ok"});
}

const editFile = async (req, res) => {
    // Aqui se editan los archivos del usuario
    res.status(200).json({"msg": "ok"});
}

const deleteFile = async (req, res) => {
    // Aqui se eliminan los archivos del usuario
    res.status(200).json({"msg": "ok"});
}

module.exports = {
    getData,
    uploadFile,
    editFile,
    deleteFile
}