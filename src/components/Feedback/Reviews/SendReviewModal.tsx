import React, {useEffect, useState} from 'react';
import styles from '../Reviews.module.scss'
import {Alert, Box, Button, InputLabel, MenuItem, Rating, Select, SelectChangeEvent, TextField} from "@mui/material";
import {BoxModalStyle} from "../../../utils/mui";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import FormControl from "@mui/material/FormControl";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {postReview} from "../../../createActions/reviewsActions";
import {useGetAdByIdQuery} from "../../../services/adsServices";


const SendReviewModal = () => {
    const dispatch = useAppDispatch()
    const adId = useAppSelector(state => state.ads.detailAd._id)
    const {reviews, errors} = useAppSelector(state => state.reviews)
    const [success, setSuccess] = useState(false)
    const [didMount, setDidMount] = useState(false)
    const [ratingValue, setRatingValue] = React.useState<number | null>(1);
    const [inputValue, setInputValue] = useState({
        text: '',
        qualityMark: 'middle',
        speedMark: 'middle',
    })

    useEffect(() => {
        setDidMount(true)
        if (didMount) {
            setSuccess(true)
        }
    }, [reviews]);

    const handleInputChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {ad: adId, text: inputValue.text, rating: ratingValue as number, qualityMark: inputValue.qualityMark, speedMark: inputValue.speedMark}
        dispatch(postReview(data))
    }

    return (
        <Box sx={{...BoxModalStyle, width: 500, p: 4}}>
            <form className={styles.reviewForm} onSubmit={e => handleSubmit(e)}>
            <div className={styles.reviewFormRating}>
                <span>Оценка: </span>
                <Rating
                    name="rating" value={ratingValue} onChange={(e, newValue) => setRatingValue(newValue)}
                    icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                    emptyIcon={<StarRateRoundedIcon fontSize='inherit'/>}
                />
            </div>
                <TextField fullWidth name='text' required={true} label="Текст отзыва" variant="standard" value={inputValue.text} onChange={e => handleInputChange(e)}/>
                <FormControl fullWidth variant='standard' required={true}>
                    <InputLabel>Качество работы</InputLabel>
                    <Select name='qualityMark'
                            value={inputValue.qualityMark}
                            onChange={(e) => handleInputChange(e)}
                    >
                        <MenuItem value={'low'}>Низкое</MenuItem>
                        <MenuItem value={'middle'}>Среднее</MenuItem>
                        <MenuItem value={'good'}>Высокое</MenuItem>
                        <MenuItem value={'perfect'}>Отличное</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth variant='standard' required={true}>
                    <InputLabel>Скорость работы</InputLabel>
                    <Select name='speedMark'
                            value={inputValue.speedMark}
                            onChange={(e) => handleInputChange(e)}
                    >
                        <MenuItem value={'low'}>Низкое</MenuItem>
                        <MenuItem value={'middle'}>Среднее</MenuItem>
                        <MenuItem value={'good'}>Высокое</MenuItem>
                        <MenuItem value={'perfect'}>Отличное</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit' disabled={success}>Отправить отзыв</Button>
                {errors && <Alert severity="error">{errors}</Alert> || success && <Alert severity="success">Отзыв успешно добавлен</Alert>}
            </form>
        </Box>
    );
};

export default SendReviewModal;