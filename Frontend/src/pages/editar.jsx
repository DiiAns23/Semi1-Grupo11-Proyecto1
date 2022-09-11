import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArticleIcon from '@mui/icons-material/Article';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PasswordIcon from '@mui/icons-material/Password';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function EditarArchivo() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Card sx={{ maxWidth: 450, maxHeight: 950, marginX: 90, marginY: 10 }}>
            <CardContent>
                <Typography variant="h5" component="div" align='center'>
                    Editar Archivo
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    Buscar archivo:
                </Typography>
                <Box sx={{ minWidth: 120 }}>
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
                <Button variant="outlined" startIcon={<SearchIcon />}>
                    Buscar
                </Button><br /><br />
                <Typography variant="body1" color="text.primary">
                    Ingresa nombre del archivo a cargar:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ArticleIcon color="primary" />
                    <TextField id="nombre" variant="standard" />
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
                <Button size="medium">Editar</Button>
                <Button size="medium">Cancelar</Button>
            </CardActions>
        </Card>
    );
}
