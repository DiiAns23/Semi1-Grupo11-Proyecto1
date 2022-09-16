import * as React from 'react';
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cookies from "js-cookie";


export default function MenuUsuario(){
    let navigateTo = useNavigate()
    const nombre_usuario =Cookies.get("username");

    function verNotificaciones() {
        navigateTo("/")
    }

    function verAmigos() {
        navigateTo("/")
    }

    function agregarAmigos() {
        navigateTo("/")
    }

    function verArchivos() {
        navigateTo("/")
    }

    function verAmigos() {
        navigateTo("/")
    }

    function subirArchivo() {
        navigateTo("/subir")
    }

    function editarArchivo() {
        navigateTo("/editar")
    }

    function eliminarArchivo() {
        navigateTo("/eliminar")
    }

    return(
        <Card sx={{ minWidth: 350, minHeight: 550}}>
            <CardMedia
                component="img"
                alt="super storage"
                height="250"
                image="/src/public/assets/images/logo_storage.jpeg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                    {nombre_usuario}
                </Typography>
                <Box sx={{ marginX: 12, marginY: 0 }}>
                    <Button variant="outlined" size="medium" align='center'>
                        Ver Notificaciones
                    </Button>
                </Box><br/>

                <Box sx={{ marginX: 9, marginY: 0 }}>
                    <Button variant="outlined" size="medium" align='center'>
                        Ver Amigos
                    </Button>
                </Box>

                <Box sx={{ marginX: 9, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center'>
                        Agregar Amigos
                    </Button>
                </Box>

                <Box sx={{ marginX: 11, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center'>
                        Ver Archivos
                    </Button>
                </Box>

                <Box sx={{ marginX: 10, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center' onClick={subirArchivo}>
                        Subir Archivo
                    </Button>
                </Box>

                <Box sx={{ marginX: 9, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center' onClick={editarArchivo}>
                        Editar Archivo
                    </Button>
                </Box>

                <Box sx={{ marginX: 8, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center' onClick={eliminarArchivo}>
                        Eliminar Archivo
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
