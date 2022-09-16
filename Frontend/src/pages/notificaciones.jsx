import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TablaArchivo from '../components/tabla';
import TextField from '@mui/material/TextField';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Typography from '@mui/material/Typography';
import CartaUsuario from '../components/usuario';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TablaArchivo2 from '../components/tabla2';
import TablaArchivo4 from '../components/tabla4';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

//
//setUsr(Cookies.get("username"))



export default function Notificaciones() {
    let navigateTo = useNavigate()
    
    function cancelar() {
        navigateTo("/dashboard")
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <br /><br />
                    <Item>
                        <center>
                            <CartaUsuario />
                            <Button size="medium" onClick={cancelar}>Cancelar</Button>
                        </center>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <br /><br />

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <InsertEmoticonIcon color="primary" />
                        <TextField id="user" variant="standard" label="Buscar" />
                    </Box><br/>
                    <Button variant="outlined" startIcon={<SearchIcon />}>
                        Buscar
                    </Button><br /><br />
                    <Item>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Mis Notificaciones
                        </Typography>
                        <TablaArchivo4/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}