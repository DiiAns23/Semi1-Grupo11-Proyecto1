import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TablaArchivo from '../components/tabla';
import MenuUsuario from '../components/menu';
import Typography from '@mui/material/Typography';
import Embed from 'react-embed';
import TablaArchivo1 from '../components/tabla1';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CardMedia from '@mui/material/CardMedia';
import Cookies from "js-cookie";
import myFetchData from "../services/FetchData";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}





export default function DashBoard() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [nuevaData, setNuevaData] = React.useState([]);
    const [datas, setDatas] = useState([]);
    const [usr, setUsr] = useState("")

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    async function obtenerArchivos() {
        console.log("entre aqui")
        const getResponse = async () => {
            let id = parseInt(Cookies.get("id_usuario"))
            const datos = {
                id_usuario: id
            }
            console.log(datos)
            const response = await myFetchData.request("home/getPublicationsUser", "POST", datos)
            return response
        }
        getResponse()
            .then(response => {
                console.log(response)
                setDatas(response)
            })
            .catch((error) => {
                console.log(error)

            })

        console.log("buscando publicos")
        const arre = []
        for (let i = 0; i < datas.length; i++) {
            let visi = datas[i].visibilidad
            let exte = datas[i].nombre
            if (visi === 1) {
                console.log("estoy aqui visibilidad publica")
                if (datas[i].nombre.includes('.')) {
                    let nom = datas[i].nombre.split('.')[1]
                    if (nom === "txt") {
                        let agre = {
                            nombre: datas[i].nombre,
                            imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663111932/semi1/proyecto1/3022200_pozqwj.png"
                        }
                        arre.push(agre)
                    } else if (nom === "pdf") {
                        let agre = {
                            nombre: datas[i].nombre,
                            imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663115839/semi1/proyecto1/pdf-1_edz0qb.png"
                        }
                        arre.push(agre)
                    } else {
                        let agre = {
                            nombre: datas[i].nombre,
                            imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663112042/semi1/proyecto1/8276523_eqlzwm.png"
                        }
                        arre.push(agre)
                    }
                } else {
                    let agre = {
                        nombre: datas[i].nombre,
                        imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663116447/semi1/proyecto1/3143149_jz3bqx.png"
                    }
                    arre.push(agre)
                }

            }
        }
        setNuevaData(arre)
    }

    let arre = []
    async function obtenerPublicos() {

        for (let i = 0; i < datas.length; i++) {
            let visi = datas[i].visibilidad
            let exte = datas[i].nombre
            if (visi === 1) {
                console.log("estoy aqui")
                if (datas[i].nombre.includes('.')) {
                    let nom = datas[i].nombre.split('.')[1]
                    if (nom === "txt") {
                        let agre = {
                            nombre: datas[i].nombre,
                            imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663111932/semi1/proyecto1/3022200_pozqwj.png"
                        }
                        arre.push(agre)
                    } else if (nom === "pdf") {
                        let agre = {
                            nombre: datas[i].nombre,
                            imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663115839/semi1/proyecto1/pdf-1_edz0qb.png"
                        }
                        arre.push(agre)
                    } else {
                        let agre = {
                            nombre: datas[i].nombre,
                            imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663112042/semi1/proyecto1/8276523_eqlzwm.png"
                        }
                        arre.push(agre)
                    }
                } else {
                    let agre = {
                        nombre: datas[i].nombre,
                        imagen: "https://res.cloudinary.com/ingenieria/image/upload/v1663116447/semi1/proyecto1/3143149_jz3bqx.png"
                    }
                    arre.push(agre)
                }

            }
        }
    }

    useEffect(() => {
        console.log("entre aqui")
        console.log("empezando useeffect")
        setUsr(Cookies.get("username"))
        obtenerArchivos()
        obtenerPublicos()
        console.log("nueva data")
        if (arre.length !== 0) {
            setNuevaData(arre)
            console.log(nuevaData)
        } else {
            obtenerPublicos()
            console.log(nuevaData)
        }


    }, [])

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
                        <Typography gutterBottom variant="h4" component="div" align='center'>
                            Archivos Publicos
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? nuevaData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : nuevaData
                                    ).map((row) => (
                                        <TableRow key={row.id_publication}>
                                            <TableCell align="center">
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 100, height: 100 }}
                                                    image={row.imagen}
                                                    alt="Live from space album cover"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography component="div" variant="h5">
                                                    {row.nombre}
                                                </Typography>
                                                <Typography component="div" variant="h7">
                                                    {usr}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Fecha
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={nuevaData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <br /><br /><br /><br />
                        <Typography gutterBottom variant="h4" component="div" align='center'>
                            Archivos Privados
                        </Typography>
                        <TablaArchivo1 />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}