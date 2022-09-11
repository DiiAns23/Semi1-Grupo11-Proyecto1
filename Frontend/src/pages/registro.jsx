import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PasswordIcon from '@mui/icons-material/Password';
import myFetchData from "../services/FetchData";
import Swal from 'sweetalert2'

export default function RegistroUsuario() {
    let navigateTo = useNavigate()
    const [data, setdata] = useState({ user: "", email: "", password: "", photo: "" })
    const [user1, setUser] = useState("")
    const [email1, setEmail] = useState("")
    const [password1, setPassword] = useState("")
    const [passwordc1, setPasswordc] = useState("")
    const [photo1, setPhoto] = useState("")


    function handlechange(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [base64code, setbase64code] = useState("")

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        const files = event.target.files;
        const file = files[0];
        getBase64(file);
    };

    const onLoad = fileString => {
        // console.log(fileString);
        const myArray = fileString.split(",", 2);
        setbase64code(myArray[1])
        // this.base64code = fileString
    };

    const getBase64 = file => {
        let reader = new FileReader();
        // console.log(reader)
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    async function registrar() {

        if (password1 === passwordc1) {
            console.log(selectedFile.name)
            let exte = selectedFile.name.split('.')[1]
            console.log(exte)
            const datos = {
                user: user1,
                email: email1,
                password: password1,
                photo: base64code,
                ext: exte
            }
            console.log(datos)
            console.log(base64code)
            const getResponse = async () => {
                const response = await myFetchData.request("student/register", "POST", datos)
                return response
            }
            getResponse()
                .then(response => {
                    console.log(response)
                    Swal.fire(
                        `Registro Correcto!`,
                        `Inicia Sesion ${user1}!`,
                        `success`
                    )
                    navigateTo("/login")
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire(
                        `Regsitro de Cuenta Incorrecto!`,
                        `${error}!`,
                        // ``,
                        `error`
                    )
                })
        } else {
            Swal.fire(
                `Regsitro de Cuenta Incorrecto!`,
                `Las contraseñas no coinciden!`,
                `error`
            )
        }
    }

    function cancelar() {
        navigateTo("/")
    }

    useEffect(() => { }, [])

    return (
        <Card sx={{ minWidth: 250, minHeight: 450, marginX: 80, marginY: 2 }}>
            <CardMedia
                component="img"
                alt="super storage"
                height="310"
                image="/src/public/assets/images/logo_storage.jpeg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                    FORMULARIO DE REGISTRO
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ingresa tus datos en el siguiente formulario para ser parte de este super almacenamiento.
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    Ingresa tu nombre:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle color="primary" />
                    <TextField id="user" variant="standard" onChange={event => setUser(event.target.value)} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Ingresa tu usuario:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <InsertEmoticonIcon color="primary" />
                    {/* <TextField id="email" variant="standard" onChange={handlechange} name="email" value={data.email} /> */}
                    <TextField id="email" variant="standard" onChange={event => setEmail(event.target.value)} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Ingresa tu contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="password" variant="standard" type='password' onChange={event => setPassword(event.target.value)} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Confirma tu contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="pwd_confir" type="password" variant="standard" onChange={event => setPasswordc(event.target.value)} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Carga tu foto de perfil:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <input type="file" name="file" onChange={changeHandler} />
                    {isFilePicked ? (
                        <div>
                            <p>Nombre Archivo: {selectedFile.name}</p>
                            <p>Tipo Archivo: {selectedFile.type}</p>
                            <p>Tamano en bytes: {selectedFile.size}</p>
                            <p>
                                Ultima modificacion:{' '}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p>Seleccione un archivo para ver sus detalles</p>
                    )}

                </Box>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={registrar}>Registrar</Button>
                <Button size="medium" onClick={cancelar}>Cancelar</Button>
            </CardActions>
        </Card>
    );
}
