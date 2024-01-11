import React from 'react';
import AdCard from "./AdCard";
import styles from './UserAds.module.scss'
import {useAppSelector} from "../../hooks";
import Divider from "@mui/material/Divider";

const UserAds = () => {
    const { ads } = useAppSelector(state => state.ads)

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

export default UserAds;