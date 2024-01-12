import React, {useEffect} from 'react';
import AdCard from "./FavoriteAdCard";
import styles from './FavoriteAds.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import Divider from "@mui/material/Divider";
import {getUserFavorites} from "../../createActions/favoritesActions";

const FavoriteAds = () => {
    const dispatch = useAppDispatch()
    const { ads } = useAppSelector(state => state.ads)

    useEffect(() => {
        dispatch(getUserFavorites())
    }, [ads]);


    return (
        <div className={styles.container}>
            {
                ads.map((ad, index) => {
                   return (
                       <>
                           <AdCard key={index} {...ad} />
                           { (ads.length - index !== 1) && <Divider /> }
                       </>
                   )
                })
            }
        </div>
    );
};

export default FavoriteAds;