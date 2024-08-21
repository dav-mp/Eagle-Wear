import React, { useState, useRef, useEffect } from 'react'

import Cookies from 'js-cookie';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useForm } from 'react-hook-form';
import { useUserActions } from '../../../hooks/store/useUserActionsStore';
import { AuthLoginApplication } from '../../../../application/authUser/authuser.application';
import DialogMessage from '../../../components/DialogMessage/DialogMessage';




const defaultTheme = createTheme();


const loginView = () => {

    const { addUserAction } = useUserActions()

    const [showPassword, setShowPassword] = useState(false);
    const [rememberStatus, setRememberStatus] = useState(false)
    const [objDialogMessage, setobjDialogMessage] = useState({
        title: '',
        body: '',
        buttonCancel: false,
        buttonAccept: false,
        type: 0
    })
    const [dialog, setDialog] = useState(false)
    
    useEffect(() => {
      
    }, [])
    

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { email, password: passwordValue } = watch()

    const password = useRef(null);
    password.current = watch("password", "");

    const onSubmit = handleSubmit((data) => {
        setobjDialogMessage({
            title: '',
            body: '',
            buttonCancel: false,
            buttonAccept: false,
            buttonClose: true,
            type: 1
        })
        setDialog(true)
        console.log(data);

        AuthLoginApplication(data)
            .then(resp => {
                
                if (resp?.token) {
                    
                    // Para guardar el JWT en una cookie
                    Cookies.set('token', resp?.token, { expires: 7, secure: true, sameSite: 'Strict' });

                    // Para leer el JWT de la cookie
                    const token = Cookies.get('token');
                    
                }
                if (rememberStatus) {
                    addUserAction(data)
                }
                // navigate('/')
                reset();
            })
            .catch(err => {
                console.log(err);
                setobjDialogMessage({
                    title: '',
                    body: 'Error al iniciar sesion, favor de volver a intentar',
                    buttonCancel: false,
                    buttonAccept: false,
                    buttonClose: true,
                    type: 3
                })
            })

    });

    const remember = (e) => {
      setRememberStatus( !rememberStatus )
    }

    const handleAcceptDialog = () => {
      setDialog(false)
    }

    const handleCancelDialog = () => {
      setDialog(false)
    }

    const handleCloseDialog = () => {
      setDialog(false)
    }


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    return (
        <>
        {dialog ?
            <DialogMessage
                info={objDialogMessage}
                handleAcceptDialog={handleAcceptDialog}
                handleCancelDialog={handleCancelDialog}
                handleCloseDialog={handleCloseDialog}
            />
            : null
        }
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 1
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} >
            <Stack spacing={3}>
                <TextField 
                required
                name="email" 
                label="Email"
                value={email} 
                {...register("email", { 
                    required: "El correo es obligatorio", 
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no es válido"
                    }
                })}/>
                {errors.email && <Typography variant='body1' color={'red'}>{errors.email.message}</Typography>}

                <TextField
                required
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordValue}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword
                            ? <VisibilityIcon/>
                            : <VisibilityOffIcon/>
                        }
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                {...register("password", {
                    required: {
                    value: true,
                    message: "Contraseña es requerida",
                    },
                    minLength: {
                    value: 6,
                    message: "Contraseña debe ser mayor a 6 caracteres",
                    },
                })}
                />
                {errors.password && <Typography variant='body1' color={'red'}>{errors.password.message}</Typography>}
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    value={true}
                    onChange={remember}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container spacing={3} padding={5}>
                    <Grid item >
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
            </Stack>
            </Box>
        </Box>
       
        </>
        
    );
}

export default loginView