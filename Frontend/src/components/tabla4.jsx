import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import myFetchData from "../services/FetchData";
import Swal from 'sweetalert2'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Embed from 'react-embed';
import { TableHead } from '@mui/material';

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

export default function TablaArchivo4() {
    let navigateTo = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [datas, setDatas] = useState([]);

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

    async function obtenerNotificaciones() {
        const getResponse = async () => {
            let id = parseInt(Cookies.get("id_usuario"))
            const datos = {
                id_usuario: id
            }
            // console.log(datos)
            const response = await myFetchData.request("student/getRequestFriend", "POST", datos)
            return response
        }
        getResponse()
            .then(response => {
                console.log("estoy recibiendo data")
                console.log(response)
                setDatas(response)
            })
            .catch((error) => {
                console.log(error)

            })
    }

    const buscarArmigo = (n)=>{
        agregarAmigo(n)
    }

    async function agregarAmigo(index,n){
        // let idf=datas[index].id_usuario
        // let nombresito=datas[index].username
        console.log(index)
        let nombresito=""
        for(let i=0; i<datas.length; i++){
            let actual = datas[i].id_usuario
            if(actual===index){
                nombresito=datas[i].username
                break
            }
        }
        console.log(nombresito)
        const getResponse = async () => {
            let id = parseInt(Cookies.get("id_usuario"))
            const datos = {
                id_usuario_f: id,
                id_friend_f:index
            }
            // console.log(datos)
            const response = await myFetchData.request("student/addFriend", "POST", datos)
            return response
        }
        getResponse()
            .then(response => {
                let validar = response.id
                if (validar !== -1) {
                    Swal.fire(
                        `Tu Solicitud con Exito!`,
                        `Tu solicitud a ${nombresito}!`,
                        `success`
                    )
                    navigateTo("/dashboard")
                } else {
                    Swal.fire(
                        `Edicion de Archivo Inconrrecto!`,
                        `Intenta de nuevo!`,
                        // ``,
                        `error`
                    )
                }
            })
            .catch((error) => {
                console.log(error)

            })
    }


    useEffect(() => {
        obtenerNotificaciones()
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
                {/* <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography component="div" variant="h5">Email</Typography>
                            </TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>
                    {(rowsPerPage > 0
                        ? datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : datas
                    ).map((row, index) => (
                        <TableRow key={index}>

                            <TableCell align="center">
                                <Typography component="div" variant="h5">
                                    {row.email}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography component="div" variant="h5">
                                    {row.username}
                                </Typography>
                            </TableCell>

                            <TableCell>

                                <Button variant="outlined" size="medium" align='center' onClick={() => buscarArmigo(row.id_usuario)}>
                                    Aceptar Solicitud
                                </Button>
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
                            count={datas.length}
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
    );
}
