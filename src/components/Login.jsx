import React, { useState } from "react";
import {TextField, Button, Container, Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {login, register, showFolder} from "../services/api";
import { useNavigate } from "react-router-dom";


function Login() {
    const [error, setError] = useState("");

    const [loginVal, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            let user = { login: loginVal, password: password };
            await login(user);
            showFolder('root').then(console.log);
            navigate('/')
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleReg = async () => {
        try {
            let user = { login: loginVal, password: password };
            await register(user);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
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
                    <InputLabel>Password</InputLabel>
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

                {/*<Typography variant={'h6'}>New to us?</Typography>*/}
                <Button variant="outlined" color="primary" onClick={handleReg}  margin='normal'>
                    Sign up
                </Button>

            </Box>

            {error && <Typography color="error">{error}</Typography>}
        </Container>
    );
}

export default Login;
