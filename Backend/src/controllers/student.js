const login = async (req, res) => {
    
    const {email, password} = req.body;
    console.log(email, password);
    res.json({'msg': 'ok'});
}

// REGISTRO
// usuario, correo, contrasenia, foto
const register = async (req, res) => {
    const {email, password, name, photo} = req.body;
    console.log(email, password, name, photo);
    res.json({'msg': 'ok'});
}

// ENVIAR SOLICITUD DE AMISTAD
const addFriend = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    res.json({'msg': 'ok'});
}

// ACEPTAR SOLICITUD DE AMISTAD
const aceptFriend = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    res.json({'msg': 'ok'});
}


module.exports = {
    login,
    register,
    addFriend,
    aceptFriend
}