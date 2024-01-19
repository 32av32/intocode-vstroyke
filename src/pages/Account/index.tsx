import React, {useEffect} from 'react';
import styles from './Account.module.scss'
import AccountSidebar from "../../components/Account/AccountSidebar";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Outlet} from "react-router-dom";
import {getAccount} from "../../createActions/userActions";


const Account = () => {
    const { loading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAccount())
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