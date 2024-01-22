import React, {useEffect} from 'react';
import styles from './UserOrders.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import Divider from "@mui/material/Divider";
import AccountAdCard from "../AccountAdCard";
import {deleteOrders, getUserOrders} from "../../../createActions/ordersActions";
import {IAd} from "../../../types/adsTypes";
import {orderStatusMap} from "../../../types/ordersTypes";
import {Alert, Button, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

const UserOrders = () => {
    const dispatch = useAppDispatch()
    const {orders, loading, errors} = useAppSelector(state => state.orders)

    useEffect(() => {
        dispatch(getUserOrders())
    }, []);

    const handleDelete = (id: string) => {
        dispatch(deleteOrders(id))
    }

    return (
        <div className={styles.container}>
            {
                (loading && <CircularProgress />) ||
                (errors && <Alert severity="error">{errors}</Alert>) ||
                orders.map((orderItem, index) => {
                let ad = orderItem.ad as IAd
                return (
                    <>
                        <div className={styles.card}>
                            <Link to={`/ads/${ad._id}`}>
                                <AccountAdCard key={index} {...orderItem.ad as IAd} />
                            </Link>
                            <div className={styles.extensions}>
                                <p className={styles.status}>Статус: {orderStatusMap[orderItem.status!]}</p>
                                <div className={styles.actions}>
                                    <Button color={'error'} variant={'outlined'}
                                            onClick={() => handleDelete(orderItem._id)}>Убрать</Button>
                                    <Button color={'warning'} variant={'contained'}>Пожаловаться</Button>
                                </div>
                            </div>
                        </div>
                        {(orders.length - index !== 1) && <Divider/>}
                    </>
                )
            })}
        </div>
    );
};

export default UserOrders;