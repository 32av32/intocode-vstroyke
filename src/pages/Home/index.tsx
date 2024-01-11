import React from 'react';
import styles from './Home.module.scss'
import ProductCard from "../../components/ProductCard";
import {useGetAdsQuery} from "../../services/adsServices";
import {CircularProgress} from "@mui/material";
import {useAppDispatch} from "../../hooks";

const Home = () => {
    const { data, isLoading, error } = useGetAdsQuery(null)
    const dispatch = useAppDispatch()

    return (
        <div className={styles.container}>
            {
                isLoading ? <CircularProgress /> :
                error ?
                <div>Ошибка при загрузке данных</div> :
                data!.map(ad => {
                    return <ProductCard key={ad._id} _id={ad._id} title={ad.title} price={ad.price} unit={ad.unit} rating={ad.rating} images={ad.images} />
                })
            }
        </div>
    );
};

export default Home;