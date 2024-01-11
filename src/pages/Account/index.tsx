import React, {useEffect} from 'react';
import styles from './Account.module.scss'
import AccountSidebar from "../../components/AccountSidebar";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Outlet, useParams} from "react-router-dom";
import {getProfile} from "../../createActions/userActions";
import AccountSettings from "../../components/AccountSettings";
import {getUserAds} from "../../createActions/adsActions";
import UserAds from "../../components/UserAds";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Account = () => {
    const { loading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(getProfile(id!))
    }, [id]);

    useEffect(() => {
        dispatch(getUserAds(id!))
    }, []);

    return (
            <div className={styles.container}>
                {loading ? <div>loading</div> : <AccountSidebar/>}
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
    );
};

export default Account;