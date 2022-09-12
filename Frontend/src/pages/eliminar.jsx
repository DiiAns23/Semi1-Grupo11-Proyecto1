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
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    async function obtenerArchivos() {
        console.log("entre aqui")
        // const getResponse = async () => {
        //     let id = Cookies.get("id_usuario")
        //     let exte = selectedFile.name.split('.')[1]
        //     let nombres = nombre + '.' + exte
        //     const datos = {
        //         id_usuario: id,
        //         name: nombres,
        //         file: base64code,
        //         visbility: visibilidad,
        //         password: pwd
        //     }
        //     console.log(datos)
        //     const response = await myFetchData.request("home/upload", "POST", datos)
        //     return response
        // }
        // getResponse()
        //     .then(response => {
        //         console.log(response)
        //         Swal.fire(
        //             `Archivo Cargado con Exito!`,
        //             `Archivo Cargado ${nombre}!`,
        //             `success`
        //         )
        //         navigateTo("/dashboard")
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         Swal.fire(
        //             `Carga de Archivo Inconrrecto!`,
        //             `${error}!`,
        //             // ``,
        //             `error`
        //         )
        //     })
    }

    async function eliminar(){
        console.log(age)
        let id = parseInt(Cookies.get("id_usuario"))
            const datos = {
                id_usuario: id,
                name: age,
                password: pwd
            }
            console.log(datos)
        const getResponse = async () => {            
            const response = await myFetchData.request("home/delete", "DELETE", datos)
            return response
        }
        getResponse()
            .then(response => {
                console.log(response)
                let validar = response.id
                if(validar!==-1){
                    Swal.fire(
                        `Archivo Eliminado con Exito!`,
                        `Archivo Eliminado ${nombre}!`,
                        `success`
                    )
                    navigateTo("/dashboard")
                }else{
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
                    `${error}!`,
                    // ``,
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box><br />
                
                <Typography variant="body1" color="text.primary">
                    Contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="pws" variant="standard" type='password' onChange={event => setPwd(event.target.value)}/>
                </Box><br />
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={eliminar}>Eliminar</Button>
                <Button size="medium" onClick={cancelar}>Cancelar</Button>
            </CardActions>
        </Card>
    );
}
