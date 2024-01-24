import React, {useEffect, useRef} from 'react';
import styles from './Navbar.module.scss'
import {Link} from 'react-router-dom'
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import Search from "./SearchTag";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import Categories from "../Categories";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCategories} from "../../createActions/commonActions";
import {logOut} from "../../slices/userSlice";


const Navbar = () => {
    const dispatch = useAppDispatch()
    const {_id} = useAppSelector(state => state.user.user)
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
                <div className={styles.navContainer}>
                    <div className={styles.nav__main}>
                        <Link className={styles.logo} to="/">
                            <Typography>VStroyke</Typography>
                        </Link>
                        <Search/>
                    </div>
                    {
                        _id ?
                            <div className={styles.nav__links}>
                                <Link to={`/account/favorites`}>
                                    <FavoriteRoundedIcon sx={linkStyle.current}/>
                                </Link>
                                <Link to={'/account/orders'}>
                                    <ShoppingCartIcon sx={linkStyle.current}/>
                                </Link>
                                <Link to={`/account`}>
                                    <AccountCircleRoundedIcon sx={linkStyle.current}/>
                                </Link>
                                <Link to='/' onClick={handleLogOut}>
                                    <LogoutIcon sx={linkStyle.current}/>
                                </Link>
                                <Button size='small' color='info' variant='contained'>
                                    <Link to={'/add_ad'}>Разместить объявление</Link>
                                </Button>
                            </div> :
                            <div className={styles.nav__links}>
                                <Link to={'/auth/signup'}>
                                    <span>Регистрация</span>
                                    <VpnKeyIcon sx={linkStyle.current}/>
                                </Link>
                                <Link to={'/auth/login'}>
                                    <span>Вход</span>
                                    <LoginIcon sx={linkStyle.current}/>
                                </Link>
                            </div>
                    }
                </div>
            </Toolbar>
            <Toolbar>
                <Categories/>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;