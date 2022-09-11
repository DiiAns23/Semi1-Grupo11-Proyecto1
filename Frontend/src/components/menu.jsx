import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function MenuUsuario(){
    return(
        <Card sx={{ maxWidth: 350, maxHeight: 750}}>
            <CardMedia
                component="img"
                alt="super storage"
                height="250"
                image="/src/public/assets/images/logo_storage.jpeg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                    USSERNAME
                </Typography>
                <Box sx={{ marginX: 12, marginY: 0 }}>
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
                    <Button variant="outlined" size="medium" align='center'>
                        Subir Archivo
                    </Button>
                </Box>

                <Box sx={{ marginX: 9, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center'>
                        Editar Archivo
                    </Button>
                </Box>

                <Box sx={{ marginX: 8, marginY: 1 }}>
                    <Button variant="outlined" size="medium" align='center'>
                        Eliminar Archivo
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
