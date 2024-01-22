import React from 'react';
import styles from './AdCard.module.scss'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import {Button} from "@mui/material";
import { Link } from 'react-router-dom';
import {IAd} from "../../types/adsTypes";
// import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

type IProps = Pick<IAd, '_id' | 'title' | 'price' | 'unit' | 'rating' | 'images'>

const AdCard = ({ _id, title, price, unit, rating, images }:IProps) => {
    return (
        <div className={styles.container} >
            <div className={styles.productImage}>
                <img alt='productImage' src={`http://localhost:4000/images/pictures/${images[0]}`} />
            </div>
            <p className={styles.title}>{title}</p>
            <p className={styles.price}>{`${price} ₽ ${unit}`}</p>
            <div className={styles.estimation}>
                <div className={styles.rating}>
                    <StarRateRoundedIcon htmlColor={'gold'} fontSize='small'/>
                    <span>{rating}</span>
                </div>
                <div className={styles.comments}>
                    <ChatBubbleIcon fontSize='small' sx={{ color: '#757575' }} />
                    <span>100 отзыва</span>
                </div>
            </div>
            {
                <div className={styles.actions}>
                    <Button variant="contained" size='small'>
                        <Link to={`/ads/${_id}`}>Больше</Link>
                    </Button>
                    {/*<div className={styles.favorite}>*/}
                    {/*    <FavoriteRoundedIcon sx={favorite ? {color: '#f44336'} : {color: '#757575'}}/>*/}
                    {/*</div>*/}
                </div>
            }
        </div>
    );
};

export default AdCard;