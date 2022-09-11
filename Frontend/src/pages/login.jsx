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
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PasswordIcon from '@mui/icons-material/Password';
import myFetchData from "../services/FetchData";
import AuthContext from "../context/Auth";
import Swal from 'sweetalert2'
import Cookies from "js-cookie";

export default function LoginUsuario() {
    let navigateTo = useNavigate()
    const [data, setdata] = useState({ name: "", password: "" })
    const { setAuth } = React.useContext(AuthContext);

    function handlechange(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    async function loggearse() {
        console.log(data)
        console.log(data.name)
        const getResponse = async () => {
            const response = await myFetchData.request("student/login", "POST", data)
            return response
        }
        getResponse()
            .then(response => {
                console.log(response)
                Cookies.set("id_usuario",1);
                // setAuth({ data })
                Swal.fire(
                    `Autenticacion Correcta!`,
                    `Bienvenido ${data.name}!`,
                    `success`
                )
                navigateTo("/dashboard")
            })
            .catch((error) => {
                console.log(error)
                Cookies.set("id_usuario",11);
                Swal.fire(
                    `Inicio de Sesion Incorrecto!`,
                    `${error}!`,
                    // ``,
                    `error`
                )
            })
    }

    function registrar() {
        navigateTo("/registro")
    }

    return (
        <Card sx={{ maxWidth: 550, maxHeight: 950, marginX: 80, marginY: 2 }}>
            <CardMedia
                component="img"
                alt="super storage"
                height="310"
                image="/src/public/assets/images/logo_storage.jpeg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                    LOG IN
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ingresa tus datos para iniciar sesion.
                </Typography>
            </CardContent>
            <CardContent>

                <Typography variant="body1" color="text.secondary">
                    Ingresa tu usuario:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <InsertEmoticonIcon color="primary" />
                    <TextField id="name" variant="standard" onChange={handlechange} name="name" value={data.name} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Ingresa tu contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="password" variant="standard" type='password' onChange={handlechange} name="password" value={data.password} />
                </Box><br />
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={loggearse}>Ingresar</Button>
                <Button size="medium" onClick={registrar}>Registrarse</Button>
            </CardActions>
        </Card>
    );
}
