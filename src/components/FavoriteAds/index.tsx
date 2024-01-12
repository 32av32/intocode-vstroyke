import React, {useEffect} from 'react';
import AdCard from "./FavoriteAdCard";
import styles from './FavoriteAds.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import Divider from "@mui/material/Divider";
import {getUserFavorites} from "../../createActions/favoritesActions";

const FavoriteAds = () => {
    const dispatch = useAppDispatch()
    const { favoriteAds } = useAppSelector(state => state.ads)

    useEffect(() => {
        dispatch(getUserFavorites())
    }, []);


    return (
        <div className={styles.container}>
            {
                favoriteAds.map((ad, index) => {
                   return (
                       <>
                           <AdCard key={index} {...ad} />
                           { (favoriteAds.length - index !== 1) && <Divider /> }
                       </>
                   )
                })
            }
        </div>
    );
};

export default FavoriteAds;