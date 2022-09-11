import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TablaArchivo from '../components/tabla';
import MenuUsuario from '../components/menu';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function DashBoard() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <br /><br />
                    <Item>
                        <center>
                            <MenuUsuario />
                        </center>                        
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <br /><br />
                    <Item>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Archivos Publicos
                        </Typography>
                        <TablaArchivo />
                        <br /><br /><br /><br />
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Archivos Privados
                        </Typography>
                        <TablaArchivo />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}