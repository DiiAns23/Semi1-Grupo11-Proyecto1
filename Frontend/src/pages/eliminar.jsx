import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PasswordIcon from '@mui/icons-material/Password';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import myFetchData from "../services/FetchData";

export default function EliminarArchivo() {
    let navigateTo = useNavigate()
    const [age, setAge] = useState('');
    const [pwd, setPwd] = useState("");
    const [datas, setDatas] = useState([]);
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const data = [
        {
            "id_publication": 1,
            "id_usuario": 7,
            "nombre": "Archivo 13",
            "archivo": "2022-8-11-17-15-12-Archivo 13",
            "visibilidad": 1
        },
        {
            "id_publication": 2,
            "id_usuario": 7,
            "nombre": "Archivo 14",
            "archivo": "2022-8-11-17-16-6-Archivo 14",
            "visibilidad": 1
        },
        {
            "id_publication": 3,
            "id_usuario": 7,
            "nombre": "Archivo 15",
            "archivo": "2022-8-11-17-16-41-Archivo 15",
            "visibilidad": 1
        },
        {
            "id_publication": 4,
            "id_usuario": 7,
            "nombre": "Archivo 16",
            "archivo": "2022-8-11-17-19-12-Archivo 16",
            "visibilidad": 1
        },
        {
            "id_publication": 5,
            "id_usuario": 7,
            "nombre": "Archivo 17",
            "archivo": "2022-8-11-17-21-19-Archivo 17",
            "visibilidad": 1
        },
        {
            "id_publication": 6,
            "id_usuario": 7,
            "nombre": "Archivo 18",
            "archivo": "2022-8-11-17-22-18-Archivo 18",
            "visibilidad": 1
        },
        {
            "id_publication": 7,
            "id_usuario": 7,
            "nombre": "Archivo 19",
            "archivo": "2022-8-11-17-22-57-Archivo 19",
            "visibilidad": 1
        },
        {
            "id_publication": 8,
            "id_usuario": 7,
            "nombre": "Archivo 20",
            "archivo": "2022-8-11-17-23-8-Archivo 20",
            "visibilidad": 1
        },
        {
            "id_publication": 9,
            "id_usuario": 7,
            "nombre": "Archivo 123",
            "archivo": "2022-8-11-17-28-28-Archivo 123",
            "visibilidad": 1
        },
        {
            "id_publication": 10,
            "id_usuario": 7,
            "nombre": "Archivo 321",
            "archivo": "2022-8-11-17-40-30-Archivo 321",
            "visibilidad": 1
        },
        {
            "id_publication": 11,
            "id_usuario": 7,
            "nombre": "Archivo 31",
            "archivo": "2022-8-11-17-41-14-Archivo 31",
            "visibilidad": 1
        }
    ]

    async function obtenerArchivos() {
        console.log("entre aqui")
        const getResponse = async () => {
            let id = parseInt(Cookies.get("id_usuario"))
            const datos = {
                id_usuario: id
            }
            console.log(datos)
            const response = await myFetchData.request("home/getPublicationsUser", "POST", datos)
            return response
        }
        getResponse()
            .then(response => {
                console.log(response)
                setDatas(response)
            })
            .catch((error) => {
                console.log(error)
                
            })
    }

    async function eliminar() {
        console.log(age)
        let id = parseInt(Cookies.get("id_usuario"))
        let nombre = datas[age].nombre
        const datos = {
            id_usuario: id,
            name: nombre,
            password: pwd
        }
        console.log(datos)
        const getResponse = async () => {
            const response = await myFetchData.request("home/delete", "POST", datos)
            return response
        }
        getResponse()
            .then(response => {
                console.log(response)
                let validar = response.id
                if (validar !== -1) {
                    Swal.fire(
                        `Archivo Eliminado con Exito!`,
                        `Archivo Eliminado ${nombre}!`,
                        `success`
                    )
                    navigateTo("/dashboard")
                } else {
                    Swal.fire(
                        `Eliminacion de Archivo Inconrrecto!`,
                        `Intenta de nuevo!`,
                        // ``,
                        `error`
                    )
                }

            })
            .catch((error) => {
                console.log(error)
                Swal.fire(
                    `Eliminacion de Archivo Inconrrecto!`,
                    // `${error}!`,
                    `Intenta de nuevo`,
                    `error`
                )
            })
    }

    function cancelar() {
        navigateTo("/dashboard")
    }

    useEffect(() => {
        obtenerArchivos()
    }, [])

    return (
        <Card sx={{ minWidth: 400, minHeight: 450, marginX: 90, marginY: 10 }}>
            <CardMedia
                component="img"
                alt="super storage"
                height="310"
                image="/src/public/assets/images/logo_storage.jpeg"
            />
            <CardContent>
                <Typography variant="h5" component="div" align='center'>
                    Eliminar Archivo
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    Buscar archivo:
                </Typography>
                <Box sx={{ minWidth: 100 }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Archivo"
                            onChange={handleChange}
                        >
                            {datas.map((row, index) => (
                                <MenuItem value={index}>{row.nombre}</MenuItem>
                            ))}
                            
                        </Select>
                    </FormControl>
                </Box><br />

                <Typography variant="body1" color="text.primary">
                    Contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="pws" variant="standard" type='password' onChange={event => setPwd(event.target.value)} />
                </Box><br />
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={eliminar}>Eliminar</Button>
                <Button size="medium" onClick={cancelar}>Cancelar</Button>
            </CardActions>
        </Card>
    );
}
