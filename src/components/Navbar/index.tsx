import React, {useEffect, useRef} from 'react';
import styles from './Navbar.module.scss'
import {Link} from 'react-router-dom'
import {AppBar, Button, Grid, Link as LinkMUI, Toolbar, Typography} from "@mui/material";
import Search from "./SearchTag";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import Categories from "../Categories";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {logOut} from "../../slices/authSlice";
import {getCategories} from "../../createActions/commonActions";


const Navbar = () => {
    const dispatch = useAppDispatch()
    const {userId} = useAppSelector(state => state.auth)
    const linkStyle = useRef({
        color: '#232323',
        '&:hover': {
            color: 'white'
        }
    })

    useEffect(() => {
        dispatch(getCategories())
    }, []);
    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <AppBar position={'static'}>
            <Toolbar>
                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Grid container spacing={15} alignItems={'center'}>
                            <Grid item>
                                <Link className={styles.logo} to="/">
                                    <Typography>VStroyke</Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Search/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={5} alignItems={'center'}>
                            <Grid item>
                                <Link to={`/account/${userId}/favorites`}>
                                    <FavoriteRoundedIcon sx={linkStyle.current}/>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/'}>
                                    <ShoppingCartIcon sx={linkStyle.current}/>
                                </Link>
                            </Grid>
                            {userId ?
                                <>
                                    <Grid item>
                                        <Link to={`/account/${userId}`}>
                                            <AccountCircleRoundedIcon sx={linkStyle.current}/>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to='/' onClick={handleLogOut}>
                                            <LogoutIcon sx={linkStyle.current}/>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Button size='small' color='info' variant='contained'>
                                            <Link to={'/add_ad'}>Разместить объявление</Link>
                                        </Button>
                                    </Grid>
                                </>
                                :
                                <>
                                    <Grid item>
                                        <Link to={'/auth/signup'}>
                                            <VpnKeyIcon sx={linkStyle.current}/>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to={'/auth/login'}>
                                            <LoginIcon sx={linkStyle.current}/>
                                        </Link>
                                    </Grid>
                                </>}
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
            <Toolbar>
                <Categories/>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;