import React from 'react';
import styles from './AccountAdCard.module.scss'
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {IAd} from "../../../types/adsTypes";
import {Rating} from "@mui/material";
import {useAppSelector} from "../../../hooks";

const AccountAdCard = ({category, images, title, price, unit, rating}: IAd) => {
    const {categories} = useAppSelector(state => state.common)
    const categoryTitle = categories.find(item => item._id === category)

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
                <p>Категория: {categoryTitle?.title}</p>
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
        </div>
    );
};

export default AccountAdCard;