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

export default function RegistroUsuario() {
    let navigateTo = useNavigate()
    const [data, setdata] = useState({ name: "", user: "", pwd: "", pwd_confir: "" })


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
        console.log(data)
        console.log(base64code)
        const getResponse = async () => {
            const response = await myFetchData.request("student/register", "POST", data)
            return response
        }
        getResponse()
            .then(response => console.log(response))
            .catch((error) => console.log(error))
    }

    function cancelar(){
        navigateTo("/")
    }

    useEffect(() => {
        
    }, [])
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
                    <TextField id="name" variant="standard" onChange={handlechange} name="name" value={data.name} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Ingresa tu usuario:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <InsertEmoticonIcon color="primary" />
                    <TextField id="user" variant="standard" onChange={handlechange} name="user" value={data.user} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Ingresa tu contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="pwd" variant="standard" type='password' onChange={handlechange} name="pwd" value={data.pwd} />
                </Box><br />
                <Typography variant="body1" color="text.secondary">
                    Confirma tu contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="pwd_confir" type="password" variant="standard" onChange={handlechange} name="pwd_confir" value={data.pwd_confir} />
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
