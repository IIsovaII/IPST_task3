import React, { useState } from "react";
import {TextField, Button, Container, Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {login, register, showFolder} from "../services/api";
import { useNavigate } from "react-router-dom";


function Login() {


    const [loginVal, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    // let logData = {};

    const handleShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const handleLogin = async () => {
        let user = { login: loginVal, password: password };
        if (!user || !user['login'] || !user['password']){
            setMessage('Необходимо ввести логин и пароль!')
            return;
        }

        login(user).then((data) => {
            console.log(data);
            if (data['token'] !== undefined)
                navigate('/')

            else
                setMessage(data.message);
        });

    };

    const handleReg = async () => {
        let user = { login: loginVal, password: password };

        if (!user || !user['login'] || !user['password']){
            setMessage('Необходимо ввести логин и пароль!')
            return;
        }

        await register(user);
        navigate('/')
    };


    return (
        <Container maxWidth="xs" alignContent= 'center' textAlign= 'center' >
            <Typography variant="h4" textAlign='center'>Log in to your account</Typography>

            <Box component="form" noValidate autoComplete="off" >
                <TextField
                    fullWidth
                    label="Login"
                    variant="outlined"
                    margin="dense"
                    value={loginVal}
                    onChange={(e) => setLogin(e.target.value)}
                />

                <FormControl
                    variant="outlined"
                    fullWidth
                    margin="dense">
                    <InputLabel required>Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>


                <Button variant="contained" color="primary" onClick={handleLogin}  margin='normal'>
                    Log in
                </Button>

                <Button variant="outlined" color="primary" onClick={handleReg}  margin='normal'>
                    Sign up
                </Button>

                <Typography color = 'error'>{message}</Typography>

            </Box>
        </Container>
    );
}

export default Login;
