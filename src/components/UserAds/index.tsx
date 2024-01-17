import React, {useEffect} from 'react';
import UserAdCard from "./UserAdCard";
import styles from './UserAds.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import Divider from "@mui/material/Divider";
import {getUserAds} from "../../createActions/adsActions";
import {useParams} from "react-router-dom";

const UserAds = () => {
    const dispatch = useAppDispatch()
    const {ads} = useAppSelector(state => state.ads)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getUserAds(id!))
    }, []);

    return (
        <div className={styles.container}>
            {ads.map((ad, index) => {
                return (
                    <>
                        <UserAdCard key={index} {...ad} />
                        {(ads.length - index !== 1) && <Divider/>}
                    </>
                )
            })}
        </div>
    );
};

export default UserAds;