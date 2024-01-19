import React from 'react';
import styles from './Home.module.scss'
import AdCard from "../../components/AdCard";
import {useGetAdsQuery} from "../../services/adsServices";
import {CircularProgress} from "@mui/material";

const Home = () => {
    const { data, isLoading, error } = useGetAdsQuery(null)

    return (
        <div className={styles.container}>
            {
                isLoading ? <CircularProgress /> :
                error ?
                <div>Ошибка при загрузке данных</div> :
                data!.map(ad => {
                    return <AdCard key={ad._id} _id={ad._id} title={ad.title} price={ad.price} unit={ad.unit} rating={ad.rating} images={ad.images} />
                })
            }
        </div>
    );
};

export default Home;