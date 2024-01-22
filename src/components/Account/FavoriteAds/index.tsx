import React, {useEffect} from 'react';
import styles from './FavoriteAds.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import Divider from "@mui/material/Divider";
import {deleteFavorite, getUserFavorites} from "../../../createActions/favoritesActions";
import AccountAdCard from "../AccountAdCard";
import {Alert, CircularProgress, IconButton} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Link} from 'react-router-dom';

const FavoriteAds = () => {
    const dispatch = useAppDispatch()
    const {favoriteAds, loading, errors} = useAppSelector(state => state.ads)

    const handleDeleteFavoriteAd = (id: string) => {
        dispatch(deleteFavorite(id))
    }

    useEffect(() => {
        dispatch(getUserFavorites())
    }, []);

    return (
        <div className={styles.container}>
            {
                (loading && <CircularProgress />) ||
                (errors && <Alert severity="error">{errors}</Alert>) ||
                favoriteAds.map((ad, index) => {
                return (
                    <>
                        <div className={styles.card}>
                            <Link to={`/ads/${ad._id}`}>
                                <AccountAdCard key={index} {...ad} />
                            </Link>
                            <div>
                                <IconButton size="large" onClick={() => handleDeleteFavoriteAd(ad._id)}>
                                    <FavoriteIcon fontSize="inherit" color='error'/>
                                </IconButton>
                            </div>
                        </div>
                        {(favoriteAds.length - index !== 1) && <Divider/>}
                    </>
                )
            })}
        </div>
    );
};

export default FavoriteAds;