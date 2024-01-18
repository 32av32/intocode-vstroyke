import React, {useEffect} from 'react';
import styles from './UserOrders.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import Divider from "@mui/material/Divider";
import AccountAdCard from "../AccountAdCard";
import {deleteOrders, getOrders} from "../../../createActions/ordersActions";
import {IAd} from "../../../types/adsTypes";
import {orderStatusMap} from "../../../types/ordersTypes";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const UserOrders = () => {
    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(state => state.orders)

    useEffect(() => {
        dispatch(getOrders())
    }, []);

    const handleDelete = (id: string) => {
        dispatch(deleteOrders(id))
    }

    return (
        <div className={styles.container}>
            {
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
                                        <Button color={'error'} variant={'outlined'} onClick={() => handleDelete(orderItem._id)}>Убрать</Button>
                                        <Button color={'warning'} variant={'outlined'}>Пожаловаться</Button>
                                    </div>
                                </div>
                            </div>
                            {(orders.length - index !== 1) && <Divider/>}
                        </>
                    )
                })
            }
        </div>
    );
};

export default UserOrders;