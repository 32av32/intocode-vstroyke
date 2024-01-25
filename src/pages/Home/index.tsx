import React, {useEffect} from 'react';
import styles from './Home.module.scss'
import AdCard from "../../components/AdCard";
import {Alert, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAds} from "../../createActions/adsActions";
import {SearchContext} from "../../App";

const Home = () => {
    const {searchValue, categoryValue} = React.useContext(SearchContext)
    const dispatch = useAppDispatch()
    const {ads, loading, errors} = useAppSelector(state => state.ads)

    useEffect(() => {
        const query = categoryValue !== '0' ? `category=${categoryValue}&title=${searchValue}` : `title=${searchValue}`
        dispatch(getAds(query))
    }, [searchValue, categoryValue]);

    return (
        <div className={styles.container}>
            {
                loading ? <CircularProgress sx={{m: '0 auto'}} /> :
                errors ?
                <Alert severity="error">Ошибка при загрузке данных</Alert> :
                ads.map(ad => {
                    return <AdCard key={ad._id} _id={ad._id} title={ad.title} price={ad.price} unit={ad.unit} rating={ad.rating} images={ad.images} />
                })
            }
        </div>
    );
};

export default Home;