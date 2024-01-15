import React from 'react';
import styles from '../FavoriteAds.module.scss'
import {IAd} from "../../../types/adsTypes";
import {IconButton, Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {useAppDispatch} from "../../../hooks";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {deleteFavorite} from "../../../createActions/favoritesActions";

const FavoriteAdCard = ({_id, category, images, title, price, unit, rating}: IAd) => {
    const dispatch = useAppDispatch()

    const handleDeleteFavoriteAd = () => {
        dispatch(deleteFavorite(_id))
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImage}>
                <img src={`http://localhost:4000/images/pictures/${images[0]}`} alt='adImage'/>
                <div className={styles.cardImage__icon}>
                    <PhotoCameraIcon fontSize='small' />
                    {images.length}
                </div>
            </div>
            <div className={styles.cardContent}>
                <h3>{title}</h3>
                <p>Категория: {category}</p>
                <h4>Цена: {price} ₽ {unit}</h4>
                <h4 className={styles.cardRating}>
                    {rating}
                    <Rating
                        name="read-only" value={rating} precision={0.5} readOnly
                        icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                        emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                    />
                </h4>
            </div>
            <div>
                <IconButton size="large" onClick={handleDeleteFavoriteAd}>
                    <FavoriteIcon fontSize="inherit" color='error' />
                </IconButton>
            </div>
        </div>
    );
};

export default FavoriteAdCard;