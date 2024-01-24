import React, {useEffect} from 'react';
import styles from './Communication.module.scss'
import {Alert, Avatar, Button, Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LoadingButton from '@mui/lab/LoadingButton';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getOrder, postOrder} from "../../createActions/ordersActions";
import {orderStatusMap} from "../../types/ordersTypes";
import {Link} from "react-router-dom";

const Communication = () => {
    const dispatch = useAppDispatch()
    const {_id, user} = useAppSelector(state => state.ads.detailAd)
    const {loading, errors, order} = useAppSelector(state => state.orders)

    const handlePostOrder = () => {
        dispatch(postOrder(_id))
    }

    useEffect(() => {
        dispatch(getOrder(_id))
    }, [_id])

    return (
        <div className={styles.container}>
            {errors && <Alert severity="error">{errors}</Alert>}
            {
                loading ?
                    <LoadingButton loading variant='contained' sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='success'>Submit</LoadingButton> :
                    <Button disabled={!!order?.status} variant={'contained'} sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='success'
                            onClick={handlePostOrder}>{order && order.status ? orderStatusMap[order.status] : 'Заказать'}</Button>
            }
            <Button variant={'contained'} sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='info'>Позвонить</Button>
            <Button variant={'contained'} sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='warning'>Написать</Button>
            <Link to={`/users/${typeof user !== 'string' && user._id}`}>
                <div className={styles.user_profile}>
                    <div className={styles.user_profile__info}>
                        <h3>{typeof user !== 'string' && user.name}</h3>
                        <div className={styles.user_profile__rating}>
                            <Rating
                                name="read-only" value={3.5} precision={0.5} readOnly
                                icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                                emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                            />
                            <span>3.5</span>
                        </div>
                        <span>{typeof user !== 'string' && user.organization}</span>
                        <span>На площадке с {typeof user !== 'string' && user.createdDate.substring(0, 10)}</span>
                    </div>
                    <Avatar alt="photo profile" sx={{width: '100px', height: '100px'}}
                            src={`http://localhost:4000/images/profile/${typeof user !== 'string' && user.image}`}/>
                </div>
            </Link>
        </div>
    );
};

export default Communication;