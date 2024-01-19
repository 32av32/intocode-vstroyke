import React, {useEffect} from 'react';
import styles from './OrdersActionsContainer.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAdOrders} from "../../../createActions/ordersActions";
import PendingOrders from "./PendingOrders";
import ProcessingOrders from "./ProcessingOrders";
import Divider from "@mui/material/Divider";

const OrdersActionsContainer = () => {
    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(state => state.orders)
    const adId = useAppSelector(state => state.ads.detailAd._id)

    useEffect(() => {
        dispatch(getAdOrders(adId))
    }, []);


    const pendingOrders = orders.filter(order => order.status === 'pending')
    const processingOrders = orders.filter(order => order.status === 'processing')
    console.log(pendingOrders)

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h3>Запросы</h3>
                <Divider/>
                {pendingOrders.length ? <PendingOrders orders={pendingOrders}/> : <span>Пусто</span>}
            </div>
            <div className={styles.item}>
                <h3>В работе</h3>
                <Divider/>
                {processingOrders.length ? <ProcessingOrders orders={processingOrders}/> : <span>Пусто</span>}
            </div>
        </div>
    );
};

export default OrdersActionsContainer;