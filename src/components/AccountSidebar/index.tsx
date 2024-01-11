import React from 'react';
import styles from './AccountSidebar.module.scss'
import Divider from '@mui/material/Divider';
import {Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LinksSideBar from "./LinksSideBar";
import {useAppSelector} from "../../hooks";
import ProfileAvatar from "./ProfileAvatar";


const AccountSidebar = () => {
    const { _id, email, image } = useAppSelector(state => state.user.user)

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <ProfileAvatar _id={_id} image={image} />
                <h2>{email}</h2>
                <div className={styles.profile__rating}>
                    <h3>5.0</h3>
                    <Rating
                        name="read-only" value={5} precision={0.5} readOnly
                        icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                        emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                    />
                </div>
            </div>
            <Divider />
            <LinksSideBar />
        </div>
    );
};

export default AccountSidebar;