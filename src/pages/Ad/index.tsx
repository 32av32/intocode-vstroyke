import React, {useEffect, useState} from 'react';
import styles from './Ad.module.scss'
import {Alert, Button, CircularProgress, Rating} from "@mui/material";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Feedback from "../../components/Feedback";
import { Link } from "react-scroll";
import Communication from "../../components/Communication";
import {useParams} from "react-router-dom";
import Address from "../../components/Address";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAdById} from "../../createActions/adsActions";
import {deleteFavorite, postFavorite} from "../../createActions/favoritesActions";
import {IAdsUser} from "../../types/adsTypes";
import OrdersActionsContainer from "../../components/Account/OrdersActionsContainer";

const Ad = () => {
    const dispatch = useAppDispatch()
    const { adId } = useParams()
    const {detailAd, loading, errors} = useAppSelector(state => state.ads)
    const {user} = useAppSelector(state => state.user)
    const {reviews} = useAppSelector(state => state.reviews)
    const [activeImage, setActiveImage] = useState(0)
    const questions = useAppSelector(state => state.questions.questions)

    useEffect(() => {
        dispatch(getAdById(adId!))
    }, [])

    const handleFavorite = () => {
        if (detailAd.favorite) {
            dispatch(deleteFavorite(detailAd._id))
        } else {
            dispatch(postFavorite(detailAd._id))
        }
    }

    return (
        errors ? <Alert severity="error">{errors}</Alert> :
        loading ? <CircularProgress sx={{m: '0 auto'}}/> :
        <div className={styles.container}>
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>{detailAd.title}</h1>
                    <p>{`${detailAd.price} ₽ ${detailAd.unit}`}</p>
                </div>
                <div className={styles.action}>
                    <Button variant={detailAd.favorite ? 'contained' : 'outlined'} color={detailAd.favorite ? 'error' : 'primary'} onClick={handleFavorite}>
                        {detailAd.favorite ? 'В избранном' : 'Добавить в избранное'}
                    </Button>
                    <Link className={styles.feedbackBlock} to={'reviews'} spy={true} smooth={true}>
                        <Rating
                            name="read-only" value={detailAd.rating} precision={0.5} readOnly
                            icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                            emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                        />
                        <span>{reviews.length} отзыва</span>
                    </Link>
                    <Link className={styles.feedbackBlock} to={'reviews'} spy={true} smooth={true}>
                        <ContactSupportIcon color={'primary'}/>
                        <span>{questions.length} вопросов</span>
                    </Link>
                </div>
                <div className={styles.imagesContainer}>
                    <div className={styles.image}>
                        <img alt='adImage'
                             src={`http://localhost:4000/images/pictures/${detailAd.images[activeImage]}`}/>
                    </div>
                    <div className={styles.imagesList}>
                        {detailAd.images.map((image, index) => {
                            return <div key={index} className={activeImage === index ? styles.active : ''}
                                        onClick={() => setActiveImage(index)}>
                                <img alt='adMiniImage'
                                     src={`http://localhost:4000/images/pictures/${image}`}/>
                            </div>
                        })}
                    </div>
                </div>
                < Address address={detailAd.address} />
                <div className={styles.description}>
                    <h2 className={'blockTitle'}>Описание</h2>
                    <p>{detailAd.description}</p>
                </div>
                <Feedback />
            </div>
            {
                typeof detailAd.user !== 'string' && user._id === detailAd.user._id ?
                    <OrdersActionsContainer /> :
                    <Communication />
            }
        </div>
    );
};

export default Ad;