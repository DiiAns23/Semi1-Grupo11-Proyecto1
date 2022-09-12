import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArticleIcon from '@mui/icons-material/Article';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PasswordIcon from '@mui/icons-material/Password';
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import myFetchData from "../services/FetchData";

export default function SubirArchivo() {
    let navigateTo = useNavigate()
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [base64code, setbase64code] = useState("")

    const [nombre, setNombre] = useState("")
    const [visibilidad, setVisibilidad] = useState("")
    const [pwd, setPwd] = useState("")

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

    async function cargar() {
        let id = parseInt(Cookies.get("id_usuario"))
        let exte = selectedFile.name.split('.')[1]
        let nombres = nombre + '.' + exte
        let visi = parseInt(visibilidad)
        const datos = {
            id_usuario: id,
            name: nombres,
            file: base64code,
            visbility: visi,
            password: pwd
        }
        console.log(datos)
        const getResponse = async () => {
            const response = await myFetchData.request("home/upload", "POST", datos)
            return response
        }
        getResponse()
            .then(response => {
                console.log(response)
                let validar = response.id
                if (validar !== -1) {
                    Swal.fire(
                        `Archivo Cargado con Exito!`,
                        `Archivo Cargado ${nombre}!`,
                        `success`
                    )
                    navigateTo("/dashboard")
                } else {
                    Swal.fire(
                        `Carga de Archivo Inconrrecto!`,
                        `Intenta de nuevo!`,
                        // ``,
                        `error`
                    )
                }

            })
            .catch((error) => {
                console.log(error)
                Swal.fire(
                    `Carga de Archivo Inconrrecto!`,
                    `${error}!`,
                    // ``,
                    `error`
                )
            })




    }

    function cancelar() {
        navigateTo("/dashboard")
    }

    return (
        <Card sx={{ minWidth: 350, minHeight: 450, marginX: 90, marginY: 10 }}>
            <CardContent>
                <Typography variant="h5" component="div" align='center'>
                    Subir Archivo
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    Cargar archivo:
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
                </Box><br />
                <Typography variant="body1" color="text.primary">
                    Ingresa nombre del archivo a cargar:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ArticleIcon color="primary" />
                    <TextField id="nombre" variant="standard" onChange={event => setNombre(event.target.value)} />
                </Box><br />
                <Typography variant="body1" color="text.primary">
                    Tipo Archivo:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Publico" onChange={event => setVisibilidad(event.target.value)} />
                            <FormControlLabel value="0" control={<Radio />} label="Privado" onChange={event => setVisibilidad(event.target.value)} />
                        </RadioGroup>
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
                <Button size="medium" onClick={cargar}>Cargar</Button>
                <Button size="medium" onClick={cancelar}>Cancelar</Button>
            </CardActions>
        </Card>
    );
}
