import React, {useState} from 'react';
import styles from '../UserAds.module.scss'
import {IAd} from "../../../types/adsTypes";
import {Box, Button, IconButton, Popover, Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useAppDispatch} from "../../../hooks";
import {deleteAd} from "../../../createActions/adsActions";
import {Link, useParams} from "react-router-dom";

const AdCard = ({_id, category, images, title, price, unit, rating}: IAd) => {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { id } = useParams()
    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEditClose = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl)

    const handleDeleteAd = () => {
        dispatch(deleteAd(_id))
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
                <IconButton onClick={e => handleEditClick(e)}>
                    <MoreHorizIcon fontSize='small' />
                </IconButton>
                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={handleEditClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Box className={styles.cardPopup} sx={{ p: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Link to={`/account/${id}/edit_add`}><Button color='info'>Редактировать</Button></Link>
                        <Button color='error' onClick={handleDeleteAd}>Удалить</Button>
                    </Box>
                </Popover>
            </div>
        </div>
    );
};

export default AdCard;