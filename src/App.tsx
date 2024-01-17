import React from 'react';
import './scss/main.scss'
import styles from './App.module.scss'
import Navbar from "./components/Navbar";
import {ThemeProvider} from "@mui/material";
import {theme} from "./utils/mui";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Ad from "./pages/Ad";
import Auth from "./pages/Auth";
import {AuthEnum} from "./types/enums";
import Account from "./pages/Account";
import AddAd from "./pages/AddAd";
import AccountSettings from "./components/Account/AccountSettings";
import UserAds from "./components/Account/UserAds";
import FavoriteAds from "./components/Account/FavoriteAds";
import UserOrders from "./components/Account/UserOrders";

function App() {
    return (
        <div className={styles.container}>
            <ThemeProvider theme={theme}>
                <Navbar/>
                <div className={styles.content}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='ads/:adId' element={<Ad />} />
                        <Route path='auth/signup' element={<Auth variant={AuthEnum.Signup} />} />
                        <Route path='auth/login' element={<Auth variant={AuthEnum.Login} />} />
                        <Route path='account' element={<Account />}>
                            <Route index element={<UserAds />} />
                            <Route path='settings' element={<AccountSettings />} />
                            <Route path='favorites' element={<FavoriteAds />} />
                            <Route path='edit_add' element={<AddAd />} />
                            <Route path='orders' element={<UserOrders />} />
                        </Route>
                        <Route path='/add_ad/' element={<AddAd />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
