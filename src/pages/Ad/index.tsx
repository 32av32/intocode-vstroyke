import React, {useEffect, useState} from 'react';
import styles from './Ad.module.scss'
import {Button, CircularProgress, Rating} from "@mui/material";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Reviews from "../../components/Reviews";
import { Link } from "react-scroll";
import Communication from "../../components/Communication";
import {useParams} from "react-router-dom";
import Address from "../../components/Address";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAdById} from "../../createActions/adsActions";
import {deleteFavorite, postFavorite} from "../../createActions/favoritesActions";

const Ad = () => {
    const dispatch = useAppDispatch()
    const { adId } = useParams()
    const {detailAd, loading} = useAppSelector(state => state.ads)
    const {reviews} = useAppSelector(state => state.reviews)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        dispatch(getAdById(adId!))
    }, [])

    const handleFavorite = () => {
        console.log('delete')
        if (detailAd.favorite) {
            dispatch(deleteFavorite(detailAd.favorite))
        } else {
            dispatch(postFavorite(detailAd._id))
        }
    }

    return (
        loading ? <CircularProgress /> :
        <div className={styles.container}>
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>{detailAd.title}</h1>
                    <h2>{`${detailAd.price} ₽ ${detailAd.unit}`}</h2>
                </div>
                <div className={styles.action}>
                    <Button variant={detailAd.favorite ? 'contained' : 'outlined'} onClick={handleFavorite}>
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
                        <span>7 вопросов</span>
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
                <Reviews/>
            </div>
            <Communication {...detailAd.user}/>
        </div>
    );
};

export default Ad;