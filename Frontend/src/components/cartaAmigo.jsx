import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';


export default function CartaAmigo() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Nombre usuario"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Informacion de archivos.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddIcon />
        </IconButton>        
      </CardActions>      
    </Card>
  );
}
