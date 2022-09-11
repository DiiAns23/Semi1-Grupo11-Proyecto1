import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function SubirArchivo() {
    return (
        <Card sx={{ maxWidth: 350, maxHeight: 950, marginX: 90, marginY: 10 }}>
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
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <FileUploadIcon />
                    </IconButton>
                </Box><br />
                <Typography variant="body1" color="text.primary">
                    Ingresa nombre del archivo a cargar:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ArticleIcon color="primary" />
                    <TextField id="nombre" variant="standard" />
                </Box><br />
                <Typography variant="body1" color="text.primary">
                    Archivo seleccionado:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ArticleIcon color="primary" />
                    <TextField id="archivo" variant="standard" />
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
                            <FormControlLabel value="publico" control={<Radio />} label="Publico" />
                            <FormControlLabel value="privado" control={<Radio />} label="Privado" />
                        </RadioGroup>
                    </FormControl>
                </Box><br />
                <Typography variant="body1" color="text.primary">
                    Contraseña:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon color="primary" />
                    <TextField id="pws" variant="standard" type='password' />
                </Box><br />
            </CardContent>
            <CardActions>
                <Button size="medium">Cargar</Button>
                <Button size="medium">Cancelar</Button>
            </CardActions>
        </Card>
    );
}
