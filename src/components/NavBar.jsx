import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Button,} from "@mui/material";
import {useState} from 'react'
import {Link} from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import {useNavigate} from "react-router-dom";
import FaceIcon from '@mui/icons-material/Face';

function f(){
    console.log('adasda');
}


export default function ButtonAppBar() {
    const [openLoginForm, setOpenLoginForm] = useState(false);
    const navigate = useNavigate();


    return (
        <Box sx={{ flexGrow: 1 }} marginBottom='30px'>
            <AppBar position="static">
                <Toolbar>

                    <Link to="/">
                        <Button size="large" variant="contained" disableElevation>
                            <AdbIcon/>
                        </Button>
                    </Link>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        LOGO
                    </Typography>


                    {localStorage.getItem('login') &&
                        <>
                            <Typography fontSize='large'>
                                {localStorage.getItem('login')}
                            </Typography>
                            <FaceIcon/>
                        </>}
                     <Button size="large" variant="contained" disableElevation onClick={() => navigate('/login')}>Log in</Button>


                </Toolbar>
            </AppBar>
        </Box>
    );
}