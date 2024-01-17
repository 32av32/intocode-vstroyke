import React, {useEffect} from 'react';
import styles from './UserOrders.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import Divider from "@mui/material/Divider";
import AccountAdCard from "../AccountAdCard";
import {getOrders} from "../../../createActions/ordersActions";
import {IAd} from "../../../types/adsTypes";
import {orderStatusMap} from "../../../types/ordersTypes";

const UserOrders = () => {
    const dispatch = useAppDispatch()
    const { orders } = useAppSelector(state => state.orders)

    useEffect(() => {
        dispatch(getOrders())
    }, []);

    return (
        <div className={styles.container}>
            {
                orders.map((orderItem, index) => {
                   return (
                       <>
                           <div className={styles.card}>
                               <AccountAdCard key={index} {...orderItem.ad as IAd} />
                               <p className={styles.status}>Статус: {orderStatusMap[orderItem.status!]}</p>
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