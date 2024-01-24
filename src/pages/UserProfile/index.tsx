import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Button, CircularProgress, Modal, Rating} from "@mui/material";
import styles from './UserProfile.module.scss'
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useParams} from "react-router-dom";
import {getUserProfile} from "../../createActions/userActions";
import {getUserAds} from "../../createActions/adsActions";
import AdCard from "../../components/AdCard";
import UserReviewForm from "./UserReviewForm";

const UserProfile = () => {
    const dispatch = useAppDispatch()
    const {users} = useAppSelector(state => state)
    const {name, image, organization, createdDate} = users.user
    const {ads, loading, errors} = useAppSelector(state => state.ads)
    const {id} = useParams()
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getUserProfile(id!))
        dispatch(getUserAds(id!))
    }, [id]);


    return (
        <div className={styles.container}>
            <div className={styles.profileSidebar}>
                {
                    (users.loading && <CircularProgress/>) ||
                    (users.errors && <Alert severity="error">{errors}</Alert>) ||
                    <>
                        <Avatar sx={{width: '150px', height: '150px'}} alt="profile photo"
                                src={`http://localhost:4000/images/profile/${image}`}/>
                        <h2>{name}</h2>
                        <p>{organization}</p>
                        <p className={styles.grayText}>На площадке с: {createdDate.substring(0, 10)}</p>
                        <div className={styles.profileRating}>
                            <h3>5.0</h3>
                            <Rating
                                name="read-only" value={5} precision={0.5} readOnly
                                icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                                emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                            />
                        </div>
                        <Button variant={'outlined'} onClick={() => setOpenModal(true)}>Оставить отзыв</Button>
                    </>
                }
            </div>
            <div className={styles.adsContainer}>
                {(loading && <CircularProgress/>) ||
                    (errors && <Alert severity="error">{errors}</Alert>) ||
                    ads.map((ad, index) => <AdCard key={index} {...ad}/>)}
            </div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <UserReviewForm/>
            </Modal>
        </div>
    );
};

export default UserProfile;