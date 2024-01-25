import React, {useState} from 'react';
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

import Chat from './components/Chat/chat';
import AccountSettings from "./components/Account/AccountSettings";
import UserAds from "./components/Account/UserAds";
import FavoriteAds from "./components/Account/FavoriteAds";
import UserOrders from "./components/Account/UserOrders";
import UserProfile from "./pages/UserProfile";

export interface ISearchContext {
    searchValue: string
    setSearchValue?: React.Dispatch<React.SetStateAction<string>>
    categoryValue: string
    setCategoryValue?: React.Dispatch<React.SetStateAction<string>>
}
export const SearchContext = React.createContext<ISearchContext>({searchValue: '', categoryValue: ''});

function App() {
    const [searchValue, setSearchValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')

    return (
        < SearchContext.Provider value={{searchValue, setSearchValue, categoryValue, setCategoryValue}}>
            <div className={styles.container}>
                <ThemeProvider theme={theme}>
                    <Navbar/>
                    <div className={styles.content}>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='ads/:adId' element={<Ad/>}/>
                            <Route path='auth/signup' element={<Auth variant={AuthEnum.Signup}/>}/>
                            <Route path='auth/login' element={<Auth variant={AuthEnum.Login}/>}/>
                            <Route path='account' element={<Account/>}>
                                <Route index element={<UserAds/>}/>
                                <Route path='favorites' element={<FavoriteAds/>}/>
                                <Route path='edit_add' element={<AddAd/>}/>
                                <Route path='orders' element={<UserOrders/>}/>
                                <Route path='settings' element={<AccountSettings/>}/>
                            </Route>
                            <Route path='account/ads/:adId' element={<Ad/>}/>
                            <Route path='/add_ad/' element={<AddAd/>}/>
                            <Route path='/users/:id' element={<UserProfile/>}/>
                        </Routes>
                    </div>
                </ThemeProvider>
            </div>
        </SearchContext.Provider>
    );
}

export default App;
