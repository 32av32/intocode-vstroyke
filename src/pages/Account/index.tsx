import React, {useEffect} from 'react';
import styles from './Account.module.scss'
import AccountSidebar from "../../components/Account/AccountSidebar";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Outlet} from "react-router-dom";
import {getAccount} from "../../createActions/userActions";
import {Alert} from "@mui/material";


const Account = () => {
    const { loading, errors} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAccount())
    }, []);

    return (
            <div className={styles.container}>
                {loading ? <div>loading</div> : <AccountSidebar/>}
                {errors && <Alert severity="error">{errors}</Alert>}
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
    );
};

export default Account;