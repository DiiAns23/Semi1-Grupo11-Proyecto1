import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";


export default function CartaUsuario(){
    const [usr, setUsr] = useState("")
    useEffect(() => {
        setUsr(Cookies.get("username"))
      }, [])
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
                    {usr}
                </Typography>
            </CardContent>
        </Card>
    );
}
