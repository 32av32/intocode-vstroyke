import React from 'react';
import styles from './Communication.module.scss'
import {Avatar, Button, Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {IAdsUser} from "../../types/adsTypes";

const Communication = ({name, organization, image, createdDate}: IAdsUser) => {


    return (
        <div className={styles.container}>
            <Button variant={'contained'} sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='success'>Заказать</Button>
            <Button variant={'contained'} sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='info'>Позвонить</Button>
            <Button variant={'contained'} sx={{width: '400px', height: '60px', fontSize: '1.3rem'}} color='warning'>Написать</Button>
            <div className={styles.user_profile}>
                <div className={styles.user_profile__info}>
                    <h3>{name}</h3>
                    <div className={styles.user_profile__rating}>
                        <Rating
                            name="read-only" value={3.5} precision={0.5} readOnly
                            icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                            emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                        />
                        <span>3.5</span>
                    </div>
                    <span>{organization}</span>
                    <span>На площадке с {createdDate.substring(0, 10)}</span>
                </div>
                <Avatar alt="photo profile" sx={{width: '100px', height: '100px'}} src={`http://localhost:4000/images/profile/${image}`}/>
            </div>
        </div>
    );
};

export default Communication;