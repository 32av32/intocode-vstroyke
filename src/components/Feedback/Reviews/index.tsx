import React, {useEffect, useState} from 'react';
import styles from '../Feedback.module.scss'
import {Avatar, Button, Divider, Modal, Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import SendReviewModal from "./SendReviewModal";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getReviews} from "../../../createActions/reviewsActions";

const getMark = (key: string) => {
    switch(key) {
        case 'low':
            return 'Низкое'
        case 'middle':
            return 'Среднее'
        case 'good':
            return 'Высокое'
        case 'perfect':
            return 'Отличное'
    }
}

const Reviews = () => {
    const dispatch = useAppDispatch()
    const {reviews} = useAppSelector(state => state.reviews)
    const {_id} = useAppSelector(state => state.ads.detailAd)
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getReviews(_id))
    }, [_id]);

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Оставить отзыв</Button>
            {
                reviews.map((review, index) => {
                    return (
                        <div key={index} className={styles.review_container}>
                            <div className={styles.review_header}>
                                <Avatar variant='rounded' alt="photo profile" sx={{width: '70px', height: '70px'}} src={`http://localhost:4000/images/profile/${review.user.image}`}/>
                                <div className={styles.review_header__title}>
                                    <Rating
                                        value={review.rating} precision={1} readOnly
                                        icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                                        emptyIcon={<StarRateRoundedIcon fontSize='inherit'/>}
                                    />
                                    <div className={styles.review_header__text}>
                                        <h3 className={styles.review_header__name}>{review.user.name}</h3>
                                        |
                                        <div className={styles.review_header__date}>{review.createdDate.substring(0, 10)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.review_mark}>
                                <div>
                                    <span>Качество работы:</span>
                                    <span>{getMark(review.qualityMark)}</span>
                                </div>
                                <div>
                                    <span>Скорость работы:</span>
                                    <span>{getMark(review.speedMark)}</span>
                                </div>
                            </div>
                            <Divider/>
                            <div className={styles.review_description}>{review.text}</div>
                        </div>
                    )
                })
            }
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <SendReviewModal/>
            </Modal>
        </>

    );
};

export default Reviews;